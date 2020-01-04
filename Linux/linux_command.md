# user maangement
useradd
userdel
usermod
passwd -s -d

# group management
groupadd
groupdel
groupmod

# network
ifconfig
ping 
netstat -an

# others
pwd
grep
ps -ef / ps aux
kill -9

shutdown
reboot


# apply command to all files
`find <top_directory> -type f -exec sh -c '<command> "$0"' {} \;`

## file sort by size
ls -alS --block-size=M


# top
## CPU
us: time cpu executing process in userspace
sy: time cpu running kernelspace processes
ni: priority of process (higher value nicer to process, so lower priority)
id: time cpu idle
wa: time cpu waiting IO to complete
hi: time handling hardware interrupt
si: time handling software interrupt

# scp
`scp source_ip:source_file dest_ip:dest_file`

# backup remote host's disk image
xfs filesystem

must use secret key / pwd of root ac
 `ssh <remote> "xfsdump -l 0 - /" > <localhost-path>`
`ssh <remote> "xfsdump -l 0 - / | gzip -c" > <host-path>`

dumpp xfs to remote host
`xfsdump -l0 - / | gzip -c | ssh user@host dd of=/backup.dgz`

restore xfs from remote host
`ssh user@host "dd if="/xx/backup.dgz" | gunzip -c | xfsrestore - /mnt`

`dd if=xxx.dgz | gunzip -c | ssh <remote> "xfsrestore - /" `




