# orientation and setup

# concept
use resource isolation features in OS kernel, eg. cgroups 
  to run multiple independent continers on same OS

container move from 1 Docker environment to another with same OS work without changes
image includes all dependencies needed

# Container
running instance of an image

# DockerFile

# Images
executable package comprised of multiple layers:
  system library, tools, other files, dependencies for executable code

image developer can reuse static image layers for different projects
used to execute code in Docker container

command line shows all top-layer images
when new container created from image, writable layer also created (container layer)
- host all changes made to running container
- store newly written,deleted files, modification to existing files

# CLI
docker ps: see running contaienrs
docker history: show history of an image (all changes)
docker update: update config of containers
docker tag: create tag to organize container images
docker search: looks in Docker Hub
docker save: save image to archive
docker rmi: remove image
docker push: user upload own custom image

// show all container
docker container ls --all
// show images
docker image ls

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

# swarm cluster
group of machines that are running Docker, joined into a cluster
swarm manager 
machines can be physical/virtual, after joining swarm, referred to as nodes

run `docker swarm join` on other machines to have them join swarm as worker


# install
instll docker-ce
sudo usermod -aG docker $USER

# run service
docker swarm init
// start running services/adjust scale
docker stack deploy -c docker-compose.yml getstartedlab
// see services
docker service ls
// take down stack
docker stack rm getstartedlab
// take down swarm
docker swarm leave --force


docker stack rm getstartedlab
// reset environment
eval $(docker-machine env -u)





