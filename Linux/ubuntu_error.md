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






