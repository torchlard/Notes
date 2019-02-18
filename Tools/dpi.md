high resoultion screen1: 3200x1800
low resoultion screen2: 1920x1080

make one screen of 7040x3960 (3200+1920x2, 1800+1920x2)
(3840+1920x2, 2160+1080x2) = (7680,4320)

HDMI-0: 3840x2160
HDMI-1: 1920x1080

xrandr --dpi 276 --fb 7680x2160 \
--output HDMI-0 --mode 3840x2160 --pos 3840x0 \
--output HDMI-1 --scale 2x2 --panning 3840x2160+0+0





