# check display manager
cat /etc/X11/default-display-manager
sudo service xxx restart

# SDDM (simple desktop display manager)
display manager for x11 and wayland
written from scratch in c++11, support theme via QML

# config
/etc/sddm.conf

default use `systemd-logind` for session management
```
[Autologin]
User=john
Session=plasma.desktop
```

available session type found in `/usr/share/xsessions/`

## theme
theme settings can be changed in `[Theme]` section, default `breeze`
available in `/usr/share/sddm/themes`

## dpi
/etc/sddm.conf
`ServerArguments=-noListen tcp -dpi 192`

## tty
ssd follows systemd convention starting first graphical session on tty1

















