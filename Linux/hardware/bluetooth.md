$ sudo bluetoothctl
[bluetooth]# power on
[bluetooth]# agent on
[bluetooth]# default-agent
[bluetooth]# scan on
[NEW] Device XX:XX:XX:XX:XX:XX David's AirPods
[bluetooth]# scan off
[bluetooth]# trust XX:XX:XX:XX:XX:XX
[bluetooth]# pair XX:XX:XX:XX:XX:XX
Attempting to pair with XX:XX:XX:XX:XX:XX
[CHG] Device XX:XX:XX:XX:XX:XX Connected: yes
[CHG] Device XX:XX:XX:XX:XX:XX UUIDs: ... 
[CHG] Device XX:XX:XX:XX:XX:XX UUIDs: ... 
[CHG] Device XX:XX:XX:XX:XX:XX UUIDs: ... 
[CHG] Device XX:XX:XX:XX:XX:XX UUIDs: ... 
[CHG] Device XX:XX:XX:XX:XX:XX UUIDs: ... 
[CHG] Device XX:XX:XX:XX:XX:XX UUIDs: ... 
[CHG] Device XX:XX:XX:XX:XX:XX UUIDs: ... 
[CHG] Device XX:XX:XX:XX:XX:XX UUIDs: ... 
[CHG] Device XX:XX:XX:XX:XX:XX Paired: yes
Pairing successful
[CHG] Device XX:XX:XX:XX:XX:XX Connected: no
[bluetooth]# connect XX:XX:XX:XX:XX:XX
Attempting to connect to XX:XX:XX:XX:XX:XX
[CHG] Device XX:XX:XX:XX:XX:XX Connected: yes
Connection successful
[bluetooth]# quit

# cannot pair to airpod
sudo vi /etc/bluetooth/main.conf
Uncomment and manually set ControllerMode to BR/EDR:
```conf
# Restricts all controllers to the specified transport. Default value
# is "dual", i.e. both BR/EDR and LE enabled (when supported by the HW).
# Possible values: "dual", "bredr", "le"
ControllerMode = bredr
```
sudo systemctl restart bluetooth




