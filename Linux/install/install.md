# source
create installation source using
- usb
- http/https (httpd)
- ftp (vsftpd)
- pxe

for massive installation, best approach boot from PXE server, install from shared network location


# boot options
boot options specific to installation program: inst
eg. `inst.vncpassword=<password>`

## edit grub2 menu
on UEFI, kernel command line starts with `linuxefi`



















