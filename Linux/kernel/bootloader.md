# grub
current version 2

when grub load in UEFI, compile as App in UEFI, put in ESP

ESP partition
```
/EFI/Boot/
/EFI/Window 10/
/EFI/Arch/
/EFI/Debian/
```
load process: UEFI => GRUB => Linux kernel

## function
1. driver to find kernel and ramdisk outside ESP
2. choose boot option and extension
3. pass boot parameters to linux kernel

Linux kernel support UEFI by EFI Stub
- kernel directly compile as app in UEFI
- identified and loaded by UEFI firmware, not by 3rd party bootloader


# refind
graphical bootloader
only for UEFI

# EFI Stub
allow EFI firmware load kernel as EFI executable














