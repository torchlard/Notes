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

# rsync
rsync -avz --exclude-from '../exclude-list.txt' host:source destination

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

# scp
copy from remote to local using ssh config
`scp <remote-alias>:<remote-path-to-copy-from> <local-path>`

# compression
best compression: xz with -2 level compression
`time tar -cvf - dir | xz -c -v -2 -T4 > dir.tar.gz`

## tar.gz
compress `tar zcvf xxx.tar.gz <src>`
uncompress `tar zxvf xxx.tar.gz`

## only package
package `tar cvf filemake.tar dirname`
unpackage `tar xvf filename.tar`

## gzip
compress `gzip filename`
uncompress `gzip -d filename.gz`

## bzip2
compress `bzip2 -z filename`
uncompress `bzip2 -d filename.bz2`

## tar.bz2
compress `tar jcvf` 
uncompress `jar jxvf`

## tar.xz
compress `tar Jcvf filename.tar.xz dirname`
uncompress `tar Jxvf filename.tar.xz`


# sort log
sudo du -h . | sort -t . -k 1 -n
sort currrent size `du -h -d 0 . | sort -h`

# count files without .git/
find . -type f | grep -v ./.git | wc -l


# cron job
install/overwrite cronjob `crontab <filename>`
remove all cron job of current user `crontab -r`
edit current cronjob `crontab -e`

# jq
transform JSON in various ways
select, iterate, reduce, mangle JSON documents

`jq 'map(.price) | add'` take array of json objects as input, 
return sum of price fields

always single quote the jq program

## filters
`.` no change
`.foo` {"foo": 42, "bar":"less interesting"} => 42
`.["foo"]` {"foo": 42} => 42
`.foo?` not output even an error occurs when . not an array / object
`.[0]` [{"n":1},{"n":2}] => {"n":1}
`.[2:4]` [1,2,3,4,5] => 

# curl
download file `curl <url> --output xxx`
download without specify name `curl -OJ http://xxx`

# check hardware
## pcie device
lspci -nnk

# substring
// show first 1000 char
echo xxx | cut -c -1000

# sed
// replace first occurrence
sed -e '0,/ROW_FORMAT=FIXED/ s/ROW_FORMAT=FIXED//' xxx.sql > yyy.sql

# find volume
du -h --max-depth=1 | sort -hr

// get total size of files
find . -mtime +22 -mtime -24 | xargs du -ach
find . -mtime +22 -mtime -24 | xargs du -ach


docker volume

# remoive extra permission (green highlight)
chmod -R a-x,o-w,+X dir



