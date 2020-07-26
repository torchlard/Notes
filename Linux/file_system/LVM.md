# command
vgs, vgdisplay
pvs, pvdisplay
lvs, lvdisplay

lsblk
`lvconvert --merge vg00/snap1`



# add new disk to lvm
1. fdisk to format as primary partition
  - n,t > 8e, w
2. pvcreate /dev/sdb1
3. vgextend centosVG /dev/sdb1
4. lvcreate -n lv01 -l100%(FREE|VG) centosVG
5. create filesystem of lv
  - eg. `mkfs -t ext4 /dev/VolGroup00/LogVol00`
  - `mkfs.xfs /dev/volgroup/logvol`
6. mount /dev/volgrp/lvol /mnt/mountpoint
7. use blkid find uuid of lv
8. append row to /etc/fstab


# snapshot
craete 300G snapshot called snap1 from source /dev/vg/lv (read only)
`lvcreate -L 300G -s -n snap1 -p r /dev/vg/lv`

snapshot also kind of logical volume

normally 10% of source lv
when data changes, snapshot size increase until 100%, then becomes not available
`lvs` check snapshot size

## restore snapshot
```
docker stop xxx
umount /root/data/3306
lvchange -a n /dev/centos/lv01    // deactivate
lvconvert --merge /dev/centos/snap1   // restore from snapshot
lvchange -a y /dev/centos/lv01    // activate again
mount /dev/centos/lv01 /root/data/3306
```

## copy logical volume
```
umount /root/data/3306
lvchange -a n /dev/centos/lv01
lvconvert --type mirror --alloc anywhere -m 1 /dev/db/d01
lvchange -a y /dev/centos/lv01
lvconvert --splitmirrors 1 --name d02 /dev/db/d01
mkfs.xfs -f /dev/db/d02
```

## note
for non long-term storage
once backup done, snapshot discarded

if block A updated in source LV, then copy original A to snapshot
mount snapshot as rw
`mount -o nouuid -t xfs /dev/centos/snap1 /mnt/snap`

### mongo
clone files with overrwire `yes | cp -rf /mnt/snap/* /mnt/mongo/`

if copy db file for mongo,
need repair `mongod --repair --config /etc/mongod.conf`


# merge snapshot for mariadb
systemctl stop mariadb
umount /mnt/mydata
lvconvert --merge /dev/centos/snap1
mount /dev/centos/lv01 /mnt/mydata
systemctl start mariadb

# activate lvm
vgchange -ay
sudo lvscan
sudo mount /dev/xxx/xxx /mnt/disk



