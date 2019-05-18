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




















