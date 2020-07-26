# mount: /root/data/3306: wrong fs type, bad option, bad superblock on /dev/mapper/db-d01, missing codepage or helper program, or other error.
mount -o nouuid -t xfs /dev/db/d01 /root/data/3306

