# about
non-commercial linux distribution appreciate security,simplicity,resource efficiency
size: 8MB as container, 150MB on disk

docker use it as default container image


# feature
binaries compiled as position independent executables (PIE)
use busybox, musl libc
package manager: apk
  - 1 read, 1 write 
use OpenRC as init  

# release
standard: just enough to get started (x86, ppc64le, s390x)
extended: most commly used packages included, for routers and servers, run on RAM
netboot
mini root file system: for containers and minimal chroots
virtual: slimmed down kernel, optimized for VM
xen
raspberry pi
generic ARM

## virtual
virtualbox
Xen

# installation option
diskless: run from read-only memory, changes to OS will lost 
  - unless run alphine local backup to save modification
data: run from readonly memory, create writable partition (/var)
sys: hard disk

# post installation
`setup-alpine`

setup networking / static IP
install docker
setup xorg
install user interface
  - xfce, lxde, openbox, mate, awesome
add man package if want online doc






















