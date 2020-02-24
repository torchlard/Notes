# full featured OS
require most storage, memory, CPU resoruces
increase attack surface of OS
price is high if only small number of features required

good for multiple, diverse applicaitons deployed in container on top of single OS

## example
Ubuntu: well supported, many downloadable format, packages
CentOS: another safe choice, more tested

# minimal OS
lost additional individual utilities, functions, applets for specific applications

## busybox
useful for container deployment since wasn't designed with container in mind
intended as fully functional in embedded application

deployed using linux / other POSIX OS as foundation
bundle them with common linux utilities in stripped down form
=> compact, single file executable contain much functionality of full distro

## alpine linux
build on earlier distribution 
use hardened kernel to add security to compact, simple goals of its predecessor

easier to add functionality than busybox

# container OS
out of box with automation and container orchestration built in
OS that alpine / busybox are hosted

container OS has software deployed using containers (container all the way down)

## RancherOS
each process run within separate container managed by docker
optimization for docker allow OS very small, very fast boot time

system services defined and configured by docker compose
only services needed for applications are loaded and deployed

## Container linux (formerly CoreOS)
designed for container deplyment on cloud-scale basis
part of Red Hat
optimized for cluster deployment across public/private cloud

kernel and essential utils in single executable
all other utilities and funcitons in containers






















