sudo apt purge -y qemu-kvm qemu-guest-agent qemu-system-x86 qemu-utils qemu libvirt-clients libvirt-daemon libvirt-dev libvirt0 qemu-system-common ipxe-qemu qemu-system-gui libvirt-daemon-system-systemd libvirtualpg0 libsasl2-dev libyajl-dev
sudo apt autoremove --purge -y
sudo rm -rf /etc/libvirt
sudo rm -rf /var/lib/libvirt

apt list --installed | grep qemu
apt list --installed | grep libvirt

sudo libvirtd --config /etc/libvirt/libvirtd.conf
sudo ./virt-manager --connect qemu://system


../configure --prefix=/usr --localstatedir=/var  --sysconfdir=/etc --enable-debug=yes --with-driver-modules --with-interface --with-qemu 


https://blog.csdn.net/qq_25675517/article/details/104398865


apt policy <package>

sudo apt-get install libvirt0=4.0.0-1ubuntu8.12

# bionic version
qemu-kvm libvirt libguestfs-tools virt-install


sudo apt install qemu=1:2.11+dfsg-1ubuntu7.23 qemu-kvm=1:2.11+dfsg-1ubuntu7.23 qemu-system-x86=1:2.11+dfsg-1ubuntu7.23



libvirt-bin=4.0.0-1ubuntu8.12 virt-manager=1:1.5.1-0ubuntu1


sudo apt-get install python-minimal=2.7.15~rc1-1 libpython-stdlib=2.7.15~rc1-1 python=2.7.15~rc1-1
