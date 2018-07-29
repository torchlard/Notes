apt purge gdm gdm3
apt install gdm3 ubuntu-desktop (reinstalling ubuntu-desktop which got removed in the last step)

Then running `systemctl restart gdm` got gdm3 to start successfully. Is it possible lingering config files from gdm (version 2?) are conflicting with gdm3 on some upgraded machines?