# change windows title height

Open Registry Editor. If you are not familiar with Registry Editor, see this detailed tutorial.
Go to the following Registry key:

HKEY_CURRENT_USER\Control Panel\Desktop\WindowMetrics

Tip: You can access any desired Registry key with one click.
Change the string value named "CaptionHeight". Set its value using the following formula:
(-15*desired height in pixels)

# AppData
user-specific preferences and profile config

Roaming: data that can move with user profile from computer to computer
Local: data that cannot move with user profile
LocalLow: low level access data, eg. temp file of browser when running in protected mode

# find and kill process listen to port 8081
netstat -ano | findstr "PID :8081"
taskkill /pid 18264 /f











