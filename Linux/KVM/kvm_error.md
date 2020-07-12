# error: Requested operation is not valid: cannot undefine domain with nvram
sudo virsh undefine xxx --nvram

# /usr/sbin/virtqemud: symbol lookup error: /usr/sbin/virtqemud: undefined symbol: virNetServerClientSetSASLSession, version LIBVIRT_PRIVATE_6.3.0
修改配置文件

vim /etc/ld.so.conf.d/libc.conf

添加在第二行

/usr/lib

# /usr/local/lib/libvirt.so.0: version `LIBVIRT_PRIVATE_6.0.0' not found (required by virsh)
reason: /usr/local/lib/libvirt.so.0 link to incorrect binary lib
solution: 


ln -s /usr/lib/x86_64-linux-gnu/libvirt-admin.so.0.06000.0 libvirt-admin.so
ln -s /usr/lib/x86_64-linux-gnu/libvirt-admin.so.0.06000.0 libvirt-admin.so.0
ln -s /usr/lib/x86_64-linux-gnu/libvirt-lxc.so.0.06000.0 libvirt-lxc.so
ln -s /usr/lib/x86_64-linux-gnu/libvirt-lxc.so.0.06000.0 libvirt-lxc.so.0
ln -s /usr/lib/x86_64-linux-gnu/libvirt-qemu.so.0.06000.0 libvirt-qemu.so
ln -s /usr/lib/x86_64-linux-gnu/libvirt-qemu.so.0.06000.0 libvirt-qemu.so.0
ln -s /usr/lib/x86_64-linux-gnu/libvirt.so.0.06000.0 libvirt.so

# Failed to connect socket to '/var/run/libvirt/libvirt-sock': No such file or directory
sudo ln -s /usr/local/var/run/libvirt/libvirt-sock /var/run/libvirt/libvirt-sock







