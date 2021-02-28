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
