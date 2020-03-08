# virtual network
libvirt use concept of virtual network switch
virtual switch connect to multiple VM

default create virbr0
default virtual network run in NAT mode
(use IP masquerading rather than SNAT / DNAT )

NAT setup using iptables
if something wrong with iptables rules, VM stop communication

# DNS & DHCP
use dnsmasq to assign IP to VM

## other routing mode
### routed
virtual switch connect to physical hsot LAN, pass traffic without NAT
all VM in subnet routed through virtual switch
no other host on physical network know this subnet exists



### isolated
traffic will not pass outside of host, nor receive traffic from outside host



















