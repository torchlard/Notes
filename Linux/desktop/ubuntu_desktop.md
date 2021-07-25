# fcitx not allow shortcut super+space
1. change file ~/.config/fcitx/config
`TriggerKey=SUPER_SPACE`
2. reopen fcitx configuration tool, update setting (don't change anything)

# cannot input chinese in browser
reason: fcitx as default input method
solution:
export GTK_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus
export INPUT_METHOD=ibus

# cannot suspend
solution: disable secure boot


# reset corrupted ubuntu repository list
sudo mv /etc/apt/sources.list ~/backup
sudo touch /etc/apt/sources.list

// enable repository options, choose best server
software-properties-gtk  





