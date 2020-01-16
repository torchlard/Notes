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

# snapshot
craete 300G snapshot called snap1 from source /dev/vg/lv (read only)
`lvcreate -L 300G -s -n snap1 -p r /dev/vg/lv`

snapshot also kind of logical volume

normally 10% of source lv
when data changes, snapshot size increase until 100%, then becomes not available
`lvs` check snapshot size





