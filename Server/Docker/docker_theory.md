# open container initiative
established in 2015 
Runtime specification: how to run 'filesystem bundle' that is unpacked on disk
Image specification: 
- sufficient information to launch application on target platform
- build system -> image manifest, filesystem serialization, image configuration
- image manifest: metadata about contents and dependencies of image
- image config: application argument, environment
- image layer: how to serialize filesystem, eg. remove files into blob

download OCI image -> unpack image into OCI runtime filesystem bundle
-> bundle run by OCI runtime

entire workflow allow run image without additional argument

# underlying technology
## namespace
create set of namespace (isolated workspace) for that container
pid: process isolation
net: network interface
ipc: ipc resource
mnt: mount point
uts: isolate kernel and version identifiers (unix timesharing system)

## control group (cgroups)
limit application to specific set of resources

## container format
combine namespace, control groups, UnionFS => container format
default `libcontainer`
in future BSD Jails, Solaris Zones

# best practice
container should not write any data => keep stateless
all file IO should use Volume / bind to host directory


## union file systems
iamge: each layer build on top of other, group of filesystem

file system operate by creating layers => very lighweight, fast
provide building blocks for containers
UnionFS variants: AUFS, btrfs, vfs, DeviceMapper

## Images
readonly template with instructions for creating Docker container

executable package comprised of multiple layers:
- system library, tools, other files, dependencies for executable code

image developer can reuse static image layers for different projects
used to execute code in Docker container

command line shows all top-layer images
when new container created from image, writable layer also created (container layer)
- host all changes made to running container
- store newly written, deleted files, modification to existing files



# concept
use resource isolation features in OS kernel, eg. cgroups 
  to run multiple independent continers on same OS

container move from 1 Docker environment to another with same OS work without changes
image includes all dependencies needed

# Docker engine
client-server application
1. server of daemon process `dockerd`
2. rest api specifies interface that program talk to daemon
3. command line interface (docker command)


# Container
running instance of an image
can connect container to many networks, attack storage to it
create new image based on current state


# docker file
## build context
current working directory called build context
























