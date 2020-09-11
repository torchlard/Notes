# create swap

sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

```
in /etc/fstab,
/swapfile swap swap defaults 0 0
```
sudo swapon --show

