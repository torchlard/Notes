# overview
no package manager, all applications run inside container
OS level virtualization 
- create and config multiple containers as isolated linux system

resource partitioning between containers performed through multiple isolated userspace instance
  - instead of hypervisor / VM
  - rely on cgroup, namespace

rkt as implementation of app container (appc) specification
- describe required properties of application container image (ACI)
part of vendor and OS independent open container initiative

use ebuild scripts from Gentoo for auto compilaiton of system components
use systemd as init system, integrate with various internal mechanism

# update distribution
additional security and reliability by FastPatch 
updates performed as whole, installedonto passive secondary boot partiion, active upon reboot/kexec
- ensure easy rollback to stable verison
- allow each boot partition signed for additional security

root partition and root fs auto resized to fill all available disk space upon reboot
root partition provide read-write storage space, OS mounted itself read-only under /usr

locksmith as reboot manager, select between different update strategies

update distribution system based on Google's Omaha
mechanism roll out updates and underlying request-response protocol based on XML

# cluster infrastructure
contaienr linux provide etcd, daemon run across all computers in cluster
API may used directly (curl), or indirectly through etcdctl (specialized provide by CoreOS)

## fleetd
fleetd creates distributed init system tie together separate systemd instances and cluster-wide etcd deployment
fleetd communicate with local systemd instances over D-Bus
allow deployment of single / multiple containers clsuter-wide












