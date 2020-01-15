# command
vgs, vgdisplay
pvs, pvdisplay
lvs, lvdisplay

lsblk

# add new disk to lvm
1. fdisk to format as primary partition
  - n,t > 8e, w
2. pvcreate /dev/sdb1
3. vgextend centosVG /dev/sdb1
4. lvcreate -n lv01 -l100%(FREE|VG) centosVG




