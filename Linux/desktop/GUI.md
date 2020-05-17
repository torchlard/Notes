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

## make qt follow system wide gtk theme
1. install qtconfig-qt4
2. install qt5-style-plugins
3. add line "QT_QPA_PLATFORMTHEME=gtk2" in /etc/environment


























