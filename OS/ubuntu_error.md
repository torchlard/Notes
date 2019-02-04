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
> The following signatures couldn't be verified because the public key is not available: NO_PUBKEY $key

solution: Replace $key with the corresponding $key from your GPG error.
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys $key













