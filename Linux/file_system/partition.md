check disk
`fdisk -l`

modify disk
`fdisk /dev/xxx`

create mount point (new folder)

locate UUID of disk
`sudo blkid`

change auto mount file
`sudo vim /etc/fstab`
UUID=14D82C19D82BF81E /data  auto 0 0

mount partitions and check
`sudo mount -av`

make ext4 fs type
`sudo mkfs.ext4 /dev/nvme1n1p1` 



