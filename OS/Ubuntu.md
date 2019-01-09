
# set fan speed config can't find file trouble

tp_fan /proc/acpi/ibm/fan
hwmon /sys/devices/virtual/hwmon/hwmon0/temp1_input
hwmon /sys/devices/platform/coretemp.0/hwmon/hwmon1/temp1_input
hwmon /sys/devices/platform/coretemp.0/hwmon/hwmon1/temp2_input
hwmon /sys/devices/platform/coretemp.0/hwmon/hwmon1/temp3_input

##(FAN_LEVEL, LOW, HIGH)
(0, 0, 55)
(1, 48, 60)
(2, 50, 61)
(3, 52, 63)
(4, 56, 65)
(5, 59, 66)
(7, 63, 32767)

# Apt “could not find a distribution template” error
gksudo gedit /etc/lsb-release

Then edit the file that opens so that it looks like this

DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=10.04
DISTRIB_CODENAME=karmic
DISTRIB_DESCRIPTION="Ubuntu Karmic Koala"

# inspect GTK+ application
gsettings set org.gtk.Settings.Debug enable-inspector-keybinding true

press ctrl+shift+d

# set certain application particular theme
at /usr/local/applications, search that app's .desktop file
change line in Exec to
`Exec=env GTK_THEME=Adwaita:light <original command>`










