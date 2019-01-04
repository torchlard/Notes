# monolithic kernel 
no access protection between various kernel subsystem
logical separation between subsystem, especially core and device driver
## modular design
component enable/disable at compile time
loadable kernel modules at runtime
strict interface low overhead: macro, inline function, function pointer

# micro kernel
large parts of kernel protected from each other, usually running as service in user space
code running in kernal very small -> micro kernel
- bugs in one service not impact other service (if no dependency)
- lower performance, simple function call need go through IPC and scheduling

# address space
common: RAM -> low address, graphics card memory -> high address
virtual address space: protected mode / paging enabled / virtual memory module activated

process space: virtual address space associated with process (continuous)
kernel spce: memory view of kernel code, create mapping prevent direct access

# execution context
special execution context run in interrupt mode
-> always in kernel mode











