# config
/etc/logrotate

# option
daily, weekly, monthly
compress        : compress all except current
delaycompress   : compress all except current and next latest
endscript       : end of prerotate / postrotate
errors "emailid": email someone error msg
missingok       : if log missing, not throw error
notifempty      : if log empty, then not run logrotate
olddir "dir"    : old version of directory put in `dir`
postrotate      : run after logrotate
prerotate       : run before logrotate
rotate 'n'      : keep latest n log
sharedscripts   : only run once
size='logsize'  : run logrotate when log size > logsize

# test
logrotate -f -l xx.log 

# flow
create /home/user/logrotate folder

mkdir /home/user/logrotate
create /home/user/logrotate/my.conf configuration file with logrotate directive as you need

create /home/user/logrotate/cronjob to run logrotate every day at 2:30 AM (this is an example)

30 2 * * * /usr/sbin/logrotate -s /home/user/logrotate/status /home/user/logrotate/my.conf > /dev/null 2>&1
check your configuration file syntax:

logrotate -d /home/user/logrotate/my.conf
configure crontab to run logrotate (Warning: This removes existing entries in your crontab. Use crontab -e to manually add the line from step 3 to an existing crontab):

crontab /home/user/logrotate/cronjob 
After this last command, logrotate will rotate file as described in /home/user/logrotate/my.conf and save log file status in /home/user/logrotate/status.


# error
## Ignoring logrotate.conf because it is writable by group or others

## parent directory has insecure permissions (It's world writable or writable by group which is not "root") Set "su" directive in config file to tell logrotate which user/group should be used for rotation.

set su <user> <user>

## gzip: stdin: file size changed while zipping
delaycompress

## still write to old file
copytruncate

## Logrotate Successful, original file goes back to original size
reason: continuously write to original file with offset, so fill with \0 at beginning

can check with:
du  --apparent-size --block-size=1 log_file 
du  --block-size=1 log_file 


















