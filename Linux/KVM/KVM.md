# intro
host: system running virtualized program
emulator: program that runs virtualized environment on host
guest: system being virtualized, ie. VM

# history
## intepreted virtualization
CPUFile: all registers in CPU 
vMEM: section of memory as virtualized CPU's memory
vIO: data structure to represent IO states
=> combine 3, form virtual environment
=> sequentially read commands and change states of VM

command from virtual device -> C program
use C progrma to change CPI

example: android SDK simulate ARM-based phone

## optimization
for x86 simulate x86, can directly run instructions
  - if privileged instruction, throw exception
  - save CPU states in CPUFilem interpret privileged command

main job becomes dispatch
=> introduce hypervisor to do dispatch, emulator submit request

for qemu, to throw exception need insert `kqemu.ko` in kernel

## hypervisor
1. bios start hypervisor
2. host = first OS hypervisor starts
3. emulator on host start guest
4. emulator reqeust resource from hypervisor, hypervisor simulate environment
5. guest request IO to hypervisor, hypervisor dispatch to host, let host run

### type1
native hypervisor
start vmx command before any kernel starts
when statup its ring0
eg. vmware esx

### type2
start after host begins, need host coorporate to run vmx


# KVM
kvm is part of linux kernel VS vmware/virtualbox not in kernel
in Xen, host called DOM0, treat host and guest the same in terms of dispatch

## privileged level
in ARM64:
- EL0: user mode
- EL1: kernel mode
- EL2: hypervisor mode

EL1 -> EL2 -> EL1 -> EL0
-> start qemu-kvm, ioctl to /dev/kvm enter kernel
-> handle request

## virtualization level
full virtualize: guest don't know itself being virtualized
para virtualize: guest know itself virtualized

VT-x: hardware accelerated virtualization

# QEMU (quick emulator)
not rely on / include any kvm module
pure software implementation, lower performance

KVM just simulate cpu and memory, cannot directly talk to it
qemu + kvm = complete virtualization platform

someone modify qemu, simulate cpu,memory -> kvm; keep network card, display
for kvm, can use other userspace tools, eg. libvirt, virsh, virt-manager

# virsh
main interface for managing virsh guest domain (create, pause, shutdown)

domain: numeric domain id / domain name / UUID

`virsh [option] <command> <domain> [arg]`
virsh list --all
log `virsh -l` 

## 
virsh define filename.xml

## network
virsh net-list
virsh net-info default

brctl show

# install
## 1. init
packages: qemu-kvm libvirt-daemon libvirt-daemon-system libvirt-clients libguestfs-tools virt-manager
```
systemctl enable libvirtd
systemctl start libvirtd

lsmod | grep -i kvm
brctl show

sudo virsh net-list
sudo virsh net-dumpxml default
```

set network
```
sudo virsh net-autostart defaults
```
setting pos: /etc/libvirt/qemu/networks

sudo usermod -aG kvm $USER
sudo usermod -aG libvirt $USER

## 2. create VM
cd /var/lib/libvirt/boot

# command
shutdown vm `virsh shutdown <vm-name>`
destroy domain `virsh destroy <vm-name>`
delete vm `virsh undefine <vm-name>`

connect to vm1 `sudo virsh console vm1` 

# make domain persistent
virsh dumpxml vm_name > vm_name.xml
virsh define vm_name.xml
To check:

virsh list --all --persistent
The VM should now be listed. Or

virsh dominfo vm_name


# OVMF (Open Virtual Machine Firmware)
project to enable UEFI support for virtual machines
start from linux kernel 3.9 and recent QEMU, now possible passthrough GPU














