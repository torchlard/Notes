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


# public key authentication
```
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

Install-Module -Force OpenSSHUtils -Scope AllUsers
Repair-AuthorizedKeyPermission C:\Users\xxxx\.ssh\authorized_keys

# security
superuser in unix => System(SY) / AdministratorsGroup (AG) in windows
permission control more granular than in unix

# service
Get-Service | findstr 'ssh'



# mysqld
## install
1. download zip of mariadb
2. mysql_install_db.exe 

## run
mysqld --console  // start with debug

## default config
C:\my.ini
C:\my.cnf

INSTALLDIR\data\my.ini
INSTALLDIR\data\my.cnf

%MYSQL_HOME%\my.ini
%MYSQL_HOME%\my.cnf


# switch window
switch window  `ctrl+super+(left/right arrow)`
overview of task windows  `super+tab`

# hosts file location
/c/Windows/System32/drivers/etc/hosts


# Dark mode
go to registry `Computer\HKEY_CURRENT_USER\Software\Microsoft\Windows\DWM`
set `AccentColor`,`AccentColorInactive` to `0d0d0d`
set `ColorPrevalence` to `1`

# setup intellij/cmd git
1. add git.exe dir to environment variable
2. run C:\Program Files\Git\cmd\start-ssh-agent.cmd
3. add id_rsa.pub to remote git repository ssh key setting
4. restart intellij













