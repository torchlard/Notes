# hyper v
can't choose server with gui, cannot boot
after boot up, network may not be activated
- select external network
- `sudo eth0 up`

# virtualbox
for hdpi monitor, use display > screen > scale factor = 200%

## set fixed ip
in network tab, set adapter1 as Host-only adapter, adapter2 as NAT

`sudo vim /etc/sysconfig/network-scripts/ifcfg-enp0s3`
```
BOOTPROTO=static
ONBOOT=yes
IPADDR=192.168.56.10
NETWORK=192.168.56.0
NETMASK=255.255.255.0
GATEWAY=192.168.56.1
DNS=8.8.8.8 192.168.56.1
NM_CONTROLLED=no 
```
`sudo systemctl restart network`

# network
## auto connect
`sudo nmtui`
use "space bar" check auto connect



# dnf
sudo dnf upgrade --refresh -y
dnf install nano
dnf remove nano
dnf autoremove

# yum
sudo yum update


# backup disk image 
xfs filesystem

must use secret key / pwd of root ac
 `ssh <remote> "xfsdump -l 0 - /" > <localhost-path>`
`ssh <remote> "xfsdump -l 0 - / | gzip -c" > <host-path>`

dumpp xfs to remote host
`xfsdump -l0 - / | gzip -c | ssh user@host dd of=/backup.dgz`

restore xfs from remote host
`ssh user@host "dd if="/xx/backup.dgz" | gunzip -c | xfsrestore - /mnt`

`dd if=xxx.dgz | gunzip -c | ssh <remote> "xfsrestore - /" `








