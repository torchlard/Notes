# support
## RAID
hardware RAID
  - any RAID functions provided by mainboard / attached controller cards
  - need to be configured before installation
software RAID: 
  - can operate several of drives as software RAID
  - RAID controlled by OS

## NVDIMM (non volatile dual in-line memory module)
type of RAM that retains its content even power is off

architecture = intel64 / amd64
device configured to sector mode
device must be supported by nd_pmem driver

booting need:
- system uses UEFI
- device supported by firmware available on system / UEFI driver
- device available under namespace

place /boot and /boot/efi on device

## deviec types
### standard partition
most commly used for /boot
### LVM
### LVM thin provisioning
manage storage pool of free space
can be allocated to arbitrary number of devices 

## file system
xfs
ext4
ext3
ext2
swap
vfat: linux file system compatible with Windows long file names on FAT
BIOS boot: very small partition required for booting from device with GPT
EFI
PReP: small boot partition located on first partition of hard drive

## RAID type
RAID 0,1,4,5,6,10

# recommend partitioning scheme
## /boot
at least 1 GB
contains OS kernel, files used during bootstrap process
not possible to use LVM volume for /boot
if root partition > 2TB, need to create separate /boot that is < 2TB

increase size if planning multiple kernel releases / errata kernels

## /boot/efi
recommended 200 MiB, UEFI-based amd64, intel64, 64 bit ARM need 200MB

## swap
2GB: 2x
2-8GB: equal
8-64GB: 4GB-0.5x
>64GB: workload dependent 

## /var
holds content for number of applications

## /usr
holds majority of software  at least 10 GB





















