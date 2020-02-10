# command
sudo apt-get install -y xdotool xbindkeys
xbindkeys -d > ~/.xbindkeysrc

killall xbindkeys
xbindkeys -f ~/.xbindkeysrc

# minimize hovering window
"xdotool windowactivate $(xdotool getmouselocation --shell | grep WINDOW | awk -F '=' '{print $2}'); xdotool getactivewindow windowminimize"
  b:8 + Release






