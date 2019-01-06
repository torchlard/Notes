# concept
use resource isolation features in OS kernel, eg. cgroups 
  to run multiple independent continers on same OS

container move from 1 Docker environment to another with same OS work without changes
image includes all dependencies needed

# Container

# DockerFile

# Images
file comprised of multiple layers:
  system library, tools, other files, dependencies for executable code

image developer can reuse static image layers for different projects
used to execute code in Docker container

command line shows all top-layer images
when new container created from image, writable layer also created (container layer)
- host all changes made to running container
- store newly written,deleted files, modification to existing files

# CLI
docker history: show history of an image (all changes)
docker update: update config of containers
docker tag: create tag to organize container images
docker search: looks in Docker Hub
docker save: save image to archive
docker rmi: remove image
docker push: user upload own custom image

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















