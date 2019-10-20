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
~/.local/share/applications
at /usr/local/applications, search that app's .desktop file
change line in Exec to
`Exec=env GTK_THEME=Adwaita:light <original command>`

# add existing user to group
usermod -a -G examplegroup exampleusername

# make qt follow system wide gtk theme
1. install qtconfig-qt4
2. install qt5-style-plugins
3. add line "QT_QPA_PLATFORMTHEME=gtk2" in /etc/environment


# change gnome key binding
gsettings get org.gnome.desktop.wm.keybindings switch-to-workspace-up
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-up "['<Super>Page_Up']"  

# power management
system power management sleep states (intel)
kernel support 4 system sleep states, 3 depend on platform support code

## possible states
check in `/sys/power/state`
standby: power-on suspend
freeze: suspend to idle
disk: suspend to disk (hibernation)
mem: meaning controlled by `/sys/power/mem_sleep`

#### mem
s2idle: suspend to idle
shallow: power-on suspend
deep: suspend to ram

string represent suspend mode enclosed in []

### s2idle
generic, pure software, light-weight, system sleep state
more energy saved relative to runtime idle by freezing user space
put all IO device into low-power states
processes spend more time in idel state

### shallow
moderate, real, power savings
relatively low-latency transition back to working system
no operating state lost (CPU retains power)

nonboot CPU offline, all low-level system functions suspended when transit state

### deep (memory)
significant power saving
everything in system put into low-power state except memory
memory in self-refresh mode to retain its contents

ACPI passes control to BIOS as last step during (suspend to ram) STR transition
=> power down some more low-level components not directly controlled by kernel

all peripheral buses lose power when enter STR
- device must able handle transition back to "on" state
- need minimal boot-strapping code to resume system

### disk
greatest power saving, used even in absence of low-level platform support for power management
read and memory restored to its pre-suspend state

(suspend to disk) STD handled by firmware/kernel
- if firmware: need dedicated partition setup via another OS for use

swsusp (swap suspend): write memory content to free swap space
- some restrictions, work most cases









