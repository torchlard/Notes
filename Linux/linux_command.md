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


# ssh
run on multiple machine
```s
parallel ::: \
  "ssh <host1> 'bash -s' < ./install.sh" \
  "ssh <host2> 'bash -s' < ./install.sh" \
  "ssh <host3> 'bash -s' < ./install.sh" 
```  

# ls
list all with size `ll -h`

# prompt
PS1="\e[40;0;36m[\u@\h \W]\$ \e[m"

# change timezone
rm -f /etc/localtime
ln -sf /usr/share/zoneinfo/America/Los_Angeles /etc/localtime


