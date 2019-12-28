# Volume
images stored as series of read-only layers
when start container
1. take read-only image
2. add read-write layer on top
3. if running container modifies existing file, file copied out of underlying read-only layer into top-most read-write layer
  - hides undelying file, not destroy it
4. when container deleted, relaunching image start fresh container without any changes made

Union fs = read-only layer + read-write layer


## persistence
goal: save (persist) data, share data between container

## volume location
/var/lib/docker/volumes/<id>/_data/xxx


## bind mounts
around since early age, limited functionality compared to volumes

file/directory on host mounted into container
  - ref by full/relative path on host

`-v <host>:<path in container>,<options>`
options: ro, consistent, delegated, cached, z, Z

`--mount`
multiple key-value pairs `<key>=<value>`
type: bind/volume/tmpfs
source: src in host
destination: in container
readonly: mount into container as readonly

`docker run -it --mount type=bind,source="$(pwd)"/target,target=/app,readonly nginx:latest`

### bind-propagation
whether mounts created within given bind-mount / named volume can be propagated to replicas of that mount

default rprivate for bind mounts, volumes

- shared: sub-mount of original expose to replica mounts, sub-mount of replica expose to original
- slave: submount of original expose to replica
- private: no expose
- rshared: ~shared, also expose nested
- rslave: ~slave, also expose nested
- rprivate: ~private, no mount point anywhere propagate

### consistency
consistent, delegated, cached

macOS use `osxfs` to propagate dir and files shared from macOS to linux VM
by default share fully-consistent
  - every write on host / mount in container flush to disk
  - all participants fully-consistent view

delegated: container runtime's view of mount authoritative, delay update in container visible to host
cached: host's view of mount authoritative, delay before update on host visible to container

### mount into non-empty directory on container
overwrite existing dir in container

## Volume
easier to backup / migrate than bind mounts
more safely shared among multiple containers
volume driver can store volumes on remote hosts/cloud providers
new volumes can have content pre-populated by container

volume not increase size of container using it
volume's content exist outside lifecycle of given contaienr

avoid writing into container's writable layer: increase container performance

`docker service create --mount 'type=volume,src=<vol-name>,dst=<container-path>,volume-driver=local,volume-opt=type=nfs' <NAME>`

`docker volume ls`
`docker volume inspect my-vol`
`docker volume rm my-vol`

remove all volume
`docker volume prune`


### remote fs
ssh fs
```
docker volume create --driver vieux/sshfs \
  -o sshcmd=test@node2:/home/test
  -o password=testpassword \
  sshvolume
```

auto create volume
```
docker run -d --name sshfs-container --volume-driver vieux/sshfs \
  --mount src=sshvolume,target=/app,volume-opt=sshcmd=test@node2:/home/test,volume-opt=password=testpassword \
  nginx:latest
```

create service which creates NFS volume
```
docker service create -d \
  --mount 'type=volume,source=nfsvolume,target=/app,volume-driver=local,volume-opt=type=nfs,volume-opt=device=:/var/docker-nfs,volume-opt=o=addr=10.0.0.10' \
  nginx:latest
```

restore data in container dbstore2
```
docker run --rm --volumes-from dbstore2 -v $(pwd):/backup \
  ubuntu bash -c "cd /dbdata && tar xvf /backup/backup.tar --strip 1"
```

## backup volume in docker
```
docker run --rm --volumes-from <src-container> \
  -v <host-backup-path>:/bk ubuntu tar cvf /bk/backup.tar <container-path-to-backup>
```


# tmpfs
can't share tmpfs between container
only available running docker on Linux

tmpfs mount is temp, persist in host memory
when container stop, tmpfs mount removed, file removed


# use case
## volumes
sharing data among multipe running container
host not guaranteed to have given directory
sotre contaienr's data remotely
need backup, restore, migrate data

## bind mounts
sharing config files from host to containers
sharing source code / build artifact
file / directory structure of hsot guaranteed consistent

## tmpfs
don't want data persist




# storage driver
allow create data in writable layer of container
file won't persist after container dead
read/write speed slower than native

each image layer only set of differences from layer
when create new container, add new writable layer on top of underlying layers

storage driver handle details about way layers interact with each other
each container has own writable container layer 
=> multiple containers can share access to same underlying image
=> yet have own data state

## container size
size: amoutn data on disk for writable layer 
virtual size: data for read-only image data used by container + container's writable layer size

## other files
- log files if using json-file logging driver
- volumes and bind mounts 
- container's configuration files
- memory written to disk if swapping enabled
- checkpoints if using experimental checkpoint/restore features

## copy-on-write strategy
sharing and copying files for max efficiency
if file/dir exists in lower layer within image, another layer need read access to it
  - just use existing file
  - first time modify the file, file copied into that layer and modified

when first time pull image from repo, each layer pulled down separately
  - stored in /var/lib/docker

when start container, thin writable container layer added on top of another layers
for aufs, overlay, overlay2, copy-on-write:
  1. search thorugh image layers for file to update, from newest to base layer
  2. when found, added to cache
  3. perform copy_up on first copy of file found, copy file to writable layer
  4. modification made to copy this of file, container cannot see read-only copy of file in lower layer

contaienr that write lot of data consume more space, because use new space in writable top layer


### docker history
`docker history <image id>` show all changes from start of image

`<missing>` layers were built on another system, not available locally


## overview
overlay2: preferred driver
aufs: preferred before Docker 18.06
devicemapper: require direct-lvm, recommended for CentOS if no overlay2
btrfs/zfs: used if host fs using
vfs: for testing, for no copy-on-write fs can be used; poor performance

## aufs
union filesystem: layers multiple directories on single Linux host, present as single directory
  - these dirs called branches (layers in Docker terminology)
  - each image layer & container layer as subdirectories within `/var/lib/docker`
  - union mount provides unified view of all layers

### image layers
diff/: content of each layer
layers/: metadata about how image layers stacked, 1 file for each image
mnt/: mount points, 1 per image/container layer 
  - use to assemble and mount unified fs for container

### container layer
if container running, `/var/lib/docker/aufs` change by
diff/: differences introduced in writable container layer
layers/: metadata about writable container
mnt/: mount point for each running container's unified fs


# OverlayFS
union filesystem ~ AUFS, faster and simpler

layers 2 directories on single linux host, present as single directory
  - dirs called layers, unification process -> union mount
lower directory = `lowerdir`, upper directory = `upperdir`, unified view = `merged`

support 128 lower overlayFS layers, better performance for `docker build`, `docker commit`
in `/var/lib/docker/overlay2`
  - `l` directory contains shortened layer identifiers as symbolic link
  - avoid hitting page size limit on args to `mount` command

## reading file
file not exist in container layer (upperdir): read from image (lowerdir)
file only exist in container layer: read directly
file exist in both: read container layer's version

## modify file
- write to file first time
copy file from image to container
work at file level,, not block level

- deleting files and directories
when file deleted within container, whiteout file created in upperdir
version in image layer not deleted
opaque directory created in upperdir, prevent dir being accessed

- renaming directory
allow only when both source and destination path on top layer, otherwise EXDEV error

## limitation
overlayFS only implements subset of POSIX standards






