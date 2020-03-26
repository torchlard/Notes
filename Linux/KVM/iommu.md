# prerequisite
1. CPU support hardware virtualization (kvm) and IOMMU
2. motherboard support IOMMU
3. guet GPU ROM support UEFI
  - all GPU since 2012 should support this

# iommu
IOMMU group is smallest set of physicaly devices that passed to VM

example
```
IOMMU Group 1:
	00:01.0 PCI bridge: Intel Corporation Xeon E3-1200 v2/3rd Gen Core processor PCI Express Root Port [8086:0151] (rev 09)
IOMMU Group 2:
	00:14.0 USB controller: Intel Corporation 7 Series/C210 Series Chipset Family USB xHCI Host Controller [8086:0e31] (rev 04)
IOMMU Group 4:
	00:1a.0 USB controller: Intel Corporation 7 Series/C210 Series Chipset Family USB Enhanced Host Controller #2 [8086:0e2d] (rev 04)
IOMMU Group 10:
	00:1d.0 USB controller: Intel Corporation 7 Series/C210 Series Chipset Family USB Enhanced Host Controller #1 [8086:0e26] (rev 04)
IOMMU Group 13:
	06:00.0 VGA compatible controller: NVIDIA Corporation GM204 [GeForce GTX 970] [10de:13c2] (rev a1)
	06:00.1 Audio device: NVIDIA Corporation GM204 High Definition Audio Controller [10de:0fbb] (rev a1)
```

to assign device to virtual machine, driver replace by stub driver / VFIO driver 
=> prevent host machine from interacting with tem

## isolate GPI
GPU drivers not tend to support dynamic rebinding very well
both drivers conflict with each other easily

starting with linux 4.1, kernel includes vfio-pci 
VFIO driver: fulfill same role as pci-stud
  - can also control devices to an extent

### bind vfio-pci via device ID
vfio-pci normally targets PCI devices by ID
=> only specify IDs of devices intend to passthrough

can specify via kernel parameter in boot loader
`vfio-pci.ids=10de:13c2,10de:0fbb` device intend to passthrough

vim /etc/initramfs/moduel
vim /etc/modules
vim amdgpu.conf

sudo update-initramfs -u


# install windows KVM with gpu passthrough
## enable IOMMU on host
1. turn on VT-d, set default GPU to onboard, plug monitors into IO panel
2. add `intel_iommu=on` to kernel command line in `/etc/defaults/grub`
  - `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash intel_iommu=on"`
  - sudo update-grub
3. disable dedicated GPU using vfio-pci

## install windows on guest
1. add real disk, remoe virtual disk
2. specify host-passthrough as CPU model
3. specify topology
4. chown `/dev/kvm` into kvm group 

## gpu passthrough
plug guest GPU in unisolated CPU-based PCIe slot
  - most motherboard have PCIe slots provided by both CPU and PCH
  - fine so long as only guest GPU is included


1. add GPU to VM as PCI host device
2. see output on monitor plugged into GPU

plug both monitors into motherboard, one into GPU using different port
switch input source toggle between host and guest OS

looking glass 3-4 frames delay
ARandR to quickly disable hidden output via GUI

## audio
audio quality not perfect

to access guest audio in host, can use PulseAudio,
but have to use qemu-patched to make it sound good

## input and other USB
pass mouse and keyboard

hardware solution ideal: usb hubs switch between 2 hosts
flexible solution: global hotkeys to switch

synergy excellent software solution
problem: games not handling mouse speed properly when running as client

1. probably want to pass through entire USB bus instead of individual devices
  - stop virt-manager conmplain device isn't present when starting VM

## optimization
1. pinning cpu core, prevent host moving VM between cores
2. huge page
  - prevent host swapping out memory as much
  - hugepage=2048
3. virtIO
  - remove overhead of emulating SATA
  - add another fake disk, set it to use virtio
  - when window complains about device missing drver, tell it look on CD drive
  - reboot and remove fake drive, switch main disk to virtio
  - can do for network device as well
4. IOThreads
  - assign each virtio device own host thread
5. bridged network
  - make VM directly connected to network
  - important for games using UPnP/NAT tricks, annoying having second NAT
  
Network manager (delete any existing connection)
```
nmcli con add type bridge ifname br0
nmcli con add type bridge-slave ifname $IFNAME master slave-br0
```

systemd: delete any existing connections, add files to `/etc/systemd/network`
enable systemd-networkd and systemd-resolved

```
br0.netdev
[NetDev]
Name=br0
Kind=bridge

bridge.network
[Match]
Name=br0

[Network]
DHCP=ipv4

ethernet.network
[Match]
Name=$IFNAME

[Network]
Bridge=br0
```

# other ideas
## host GPU
option 1: use 2 dedicated GPUs in separate IOMMU groups
option 2: not disable dedicated GPU at all, run on it while not using VM

## disk layout
best to leave alone on its own entire disk
shoring both OS on same disk has problem of having to select right OS in grub

good idea to have large HDD to install games and portable apps onto
=> not dependent on nay particular OS

## pass files between host and guest
1. usb drive if have 2 usb buses
2. normal shared folders exposed to VM
3. normal network sharing

## synergy
solution for mouse issue

synergy.conf
```conf
section: options
  relativeMouseMoves = true
  screenSaverSync = true
end
```










