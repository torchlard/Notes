# /var/log
/etc/rsyslog.conf: control what goes inside some of log files

`*.info;mail.none;authpriv.none;cron.none`
*.info: all logs with type INFO will be logged
mail.none: err msg from mail not logged into /var/log/messages

## system log
messages: global system messages, include during system startup
dmesg: kernel ring buffer information
  - when system boots up, display info about hardware devices
  - whenever new msg come old msg overwritten
auth.log: system auth information, include user login and auth mechanism used
boot.log: all info when system boots
daemon.log: info of various background daemons that runs on system
dpkg: info package installed/removed using dpkg 
kern: info logged by kernel
lastlog: recent login info for all users
maillog/mail.log: log of mail sserver 
user.log: all user level logs
Xorg.x.log: log msg from X
alternatives.log: update-alternatives info
btmp: failed login attemps
cups: all printer and printing related log
anaconda.log: when install linux, all install related info
yum.log: info using yum
cron: when start cron job, logs info about cron job
secure: info related to authentication and authorization
wtmp/utmp: login records
faillog: user failed login attemps

## other logs
httpd/apache2
lighttpd: light httpd access_log
conman
prelink. prelink program modifies shared lib and linked lib to speed up startup process
audit: lgos info stored by linux audit daemon
setroubleshoot: SELinux use it to notify issues in security context of files
samba
sa: daily sar files
sssd: used by system security services daemon that manage access to remote dir, authentication

# view log
vi
tail
grep
less






