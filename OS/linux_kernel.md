# intro
## monolithic kernel 
no access protection between various kernel subsystem
logical separation between subsystem, especially core and device driver
### modular design
component enable/disable at compile time
loadable kernel modules at runtime
strict interface low overhead: macro, inline function, function pointer

## micro kernel
large parts of kernel protected from each other, usually running as service in user space
code running in kernal very small -> micro kernel
- bugs in one service not impact other service (if no dependency)
- lower performance, simple function call need go through IPC and scheduling

## address space
common: RAM -> low address, graphics card memory -> high address
virtual address space: protected mode / paging enabled / virtual memory module activated

process space: virtual address space associated with process (continuous)
kernel spce: memory view of kernel code, create mapping prevent direct access

## execution context
special execution context run in interrupt mode
-> always in kernel mode

## linux source code folder
arch: different architecture
block: read, write data from block devices (create IO req ..)
certs: signature checking using certificates
crypto: cryptography algorithm
Documentation
drivers: driver for various devices, Linux driver model implementation
firmware: binary/hex firmware file of devices
fs: Virtual Filesystem Switch, various filesystem srivers
include: header files
init: init code runs during boot
ipc: IPC system calls like message queue, semaphores, shared memory
kernel: process management code, scheduler, tracing, time management, locking
lib: sorting, checksum, compression, bitmap ..
mm: memory management code (physical, virtual memory), page, allocator, swap, mapping
net: network stacks include IPv4, IPv6
sample: driver samples
scripts: build systems for building module, kernel config ...
security: Linux Security Module framework (SELinux, smack, apparmor, tomoyo..)
sound: ALSA, OSS
tools: user space tools for testing/interacting with kernel subsystem
usr: embedding initrd file in kernel image
virt: KVM hypervisor

# System Call
system call are not function call, but instruction that
1. setup info to identify system call and param, issue trap instruction
2. mode: user -> kernel
3. user stack, return addr, register saved on kernel stack
4. system call dispatcher: verify system call num, run kernel fn associated with system call
5. user space register restored, get result of system call
6. suer space application resume

system call identified by numbers, param: machine word -> max 6 params
system lib offer functions implement actual system calls

## parameter handling
- never allow pointers to kernel-space
- check for invalid pointer

possible errors:
- pass pointer to read system call -> corrupt kernel memory
- unmaped, read-only pointer needed to be written -> kernel crash

2 approach checking invalid pointer
1. check against user address space before use
2. avoid checking, rely on MMU to detect, use page fault handler

- exact instruction that access user space recorded in exception table
- page fault occur -> faulting address checked against table

### Virtual Dynamic Shared Object
kernel provide virtual .so file, not in disk
when program init, kernel map .so to memory space
prepare different .so for different version kernel

optimize system call implementation
> time consuming each time software interrupt
> suitable for frequent but consume very few time calls

eg. x86 use "0x80", "sysenter" to issue system call
- stream of instruction issue system call, generated by kernel in special memory area
- memory area mapped to end of user address space
- libs search for VDSO, use if available

multiple virtual page --> same physical frame

### history
in early 32 bit instruction set, no instruction for system call
-> user mode use software interrupt to call
later "sysenter" appears in Intel, but not compatible

solution: let kernel decide system call method
introduce vsyscall in kernel address space, allow user mode read+execute

















