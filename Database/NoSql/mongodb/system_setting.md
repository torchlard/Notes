# swapping

```bash
sudo dd if=/dev/zero of=/swapfile bs=1024 count=4194304 #4G
sudo chmod 600 /swapfile
sudo mkswap /swapfile

```
`sudo vim /etc/fstab`
`/swapfile       swap    swap    defaults 0 0`

`sudo vim /etc/sysctl.conf`
0: disable swapping
1: use swap only to avoid out-of-memory problem
60: swap to disk often (default)
100: swap aggressively to disk
`vm.swappiness = 1 `
`sudo sysctl -p`


















