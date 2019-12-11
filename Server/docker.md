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

## union file systems
fiel system operate by creating layers => very lighweight, fast
provide building blocks for containers
UnionFS variants: AUFS, btrfs, vfs, DeviceMapper

## container format
combine namespace, control groups, UnionFS => container format
default `libcontainer`
in future BSD Jails, Solaris Zones


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

# Images
readonly template with instructions for creating Docker container

executable package comprised of multiple layers:
- system library, tools, other files, dependencies for executable code

image developer can reuse static image layers for different projects
used to execute code in Docker container

command line shows all top-layer images
when new container created from image, writable layer also created (container layer)
- host all changes made to running container
- store newly written, deleted files, modification to existing files

# Container
running instance of an image
can connect container to many networks, attack storage to it
create new image based on current state

# CLI
`docker ps` see running contaienrs
`docker history` show history of an image (all changes)
`docker update` update config of containers
`docker tag` create tag to organize container images
`docker search` looks in Docker Hub
`docker save` save image to archive
`docker rmi` remove image
`docker push` user upload own custom image

show all container `docker container ls --all`

show images
`docker image ls`

delete none images
`docker rmi -f $(docker images -f "dangling=true" -q)`


# swarm cluster
group of machines that are running Docker, joined into a cluster
swarm manager 
machines can be physical/virtual, after joining swarm, referred to as nodes

run `docker swarm join` on other machines to have them join swarm as worker


# install
instll docker-ce
sudo usermod -aG docker $USER

# run service
`docker swarm init`
start running services/adjust scale `docker stack deploy -c docker-compose.yml getstartedlab`
see services `docker service ls`
take down stack `docker stack rm getstartedlab`
take down swarm `docker swarm leave --force`
`docker stack rm getstartedlab`
reset environment `eval $(docker-machine env -u)`


## example
- run mariadb
docker run --name some-mariadb -e MYSQL_ROOT_PASSWORD=123456 -d mariadb:latest

docker stop e4a8800b0d71
docker container start e4a8800b0d71

OR

1. write stack.yml
2. docker-compose -f stack.yml up
3. enter container shell `docker exec -it mariadb_db_1 bash`

mariadb:
(GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY PASSWORD '123456' WITH GRANT OPTION)
(show grant for user@localhost)

mysql 8.0:
(CREATE USER 'root'@'%' IDENTIFIED BY 'root';
 mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;)



# install windows docker with WSL 1
1. install window version of docker
2. enable hyper-v
3. tick 'Expose daemon on tcp://localhost:2375 without TLS' in docker setting
4. run in bash
sudo apt update
sudo apt install docker.io
sudo usermod -aG docker $USER

5. write to ~/.profile
export DOCKER_HOST=127.0.0.1:2375
6. source ~/.profile
7. test using `docker run hello-world`
8. install docker-compose


# docker compose














