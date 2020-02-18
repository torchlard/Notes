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





























