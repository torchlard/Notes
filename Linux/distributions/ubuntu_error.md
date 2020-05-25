# set auto login, freeze in login page
press ctrl+alt+F3, go to tty console and change file in `/etc/gdm3/customxx`, 
change True to true, disable problematic wayland

#
apt purge gdm gdm3
apt install gdm3 ubuntu-desktop (reinstalling ubuntu-desktop which got removed in the last step)

Then running `systemctl restart gdm` got gdm3 to start successfully. 
Is it possible lingering config files from gdm (version 2?) are conflicting with gdm3 on some upgraded machines?

# uninstall chrome
sudo dpkg -r google-chrome-stable


# W: GPG error: http://nginx.org/packages/ubuntu cosmic InRelease: 
situation:
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY $key

solution: Replace $key with the corresponding $key from your GPG error.
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys $key

# resume from suspend => screen freeze
reason: PM default maybe s2idle
solution: 
change in `/etc/default/grub` to set sleep mode to (suspend to memory) :
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash mem_sleep_default=deep"

$ sudo grub-mkconfig -o /boot/grub/grub.cfg

# dpkg error
Search for the offending package by name and remove its entry `vim /var/lib/dpkg/status`
`sudo dpkg --configure -a`
run `sudo apt-get -f install` just in case

# cannot snap run
option 1: (before boot)
sudo apparmor_parser -r /etc/apparmor.d/*snap-confine*
sudo apparmor_parser -r /var/lib/snapd/apparmor/profiles/snap-confine*

option 2:
sudo systemctl start apparmor

# error: cannot find app "redis-desktop-manager" in "redis-desktop-manager"
http://www.cxybcw.com/127634.html

# configure.ac:32: error: possibly undefined macro: AM_INIT_AUTOMAKE
If this token and others are legitimate, please use m4_pattern_allow.
See the Autoconf documentation.

## solution
install autogen libtool shtool

# Can not run configure command: “No such file or directory”
use autoconf

# configure: error: cannot find install-sh, install.sh, or shtool in build-aux ".."/build-aux

# You must install the glib-2.0 gobject-2.0 gio-2.0 >= 2.48.0 pkg-config module to compile libvirt
libglib2.0-dev libgnutls28-dev libghc-gnutls-dev guile-gnutls libnl-3-dev libnl-route-3-dev libxml2-dev xsltproc python3-docutils libdevmapper-dev libpciaccess-dev


# virsh: error while loading shared libraries: libvirt-lxc.so.0: cannot open shared object file: No such file or directory
## reason
You were probably in the situation that /usr/local/lib was in /etc/ld.so.conf but was not in /etc/ld.so.cache until after you ran ldconfig.
注意：如果./configure不带任何参数，各种文件会被安装到诸如/usr/local，/var/local下面，这样和原生安装路径不一致，通常不要这样安装

## solution
../configure --prefix=/usr --localstatedir=/var  --sysconfdir=/etc --enable-debug=yes


# error: Failed to connect socket to '/var/run/libvirt/libvirt-sock': No such file or directory

# install virt-manager
libosinfo-1.0-dev python-gi-dev libgtksourceview-3.0-1 intltool gobject-introspection

# ValueError: Namespace LibvirtGLib not available
gir1.2-libvirt-glib-1.0 gir1.2-gtk-vnc-2.0 gir1.2-spiceclientgtk-3.0 python3-libxml2


# cannot call pip3
python3 -m pip xxx

# '/usr/local/var/run/libvirt/virtqemud-sock': No such file or directory


