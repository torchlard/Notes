
If you are installing from USB stick and get the following error..
"An attempt to configure apt to install additional packages from the CD failed"

You will need to manually delete the apt-setup file that points to your cdrom.

1. Run the USB install as normal
2. When you get to the screen where you enter your user name, pc name, etc. CTRL-ALT-F1 to get a shell.
3. Run this command
> sudo rm /usr/lib/ubiquity/apt-setup/generators/40cdrom
for password just press enter
4. Press CTRL-ALT-F7 to get back to your install
5. Fill out your username password, etc as usual and continue and the install should continue and finish. 