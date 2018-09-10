# fundamental
## P2P Group
1:1 : P2P group owner <---> client
1:n : P2P group owner <--> P2P client
                      <--> P2P client
                      <--> Legacy client (not compliant with wifi p2p)

## wifi direct VS wifi hotspot
wifi-driect use P2P communicate directly
wifi-hotspot communicate via middleman (hotspot)

## 系統根據以下流程開啟 wifi

載入 wifi kernel module。在 wifi kernel module 中，主要是透過 ioctl 的方式與 user space 下運行的 wpa_supplicant 進行溝通。
另外在硬體的實現上，由於 CPU 需要有另一個介面與 wifi chip 進行溝通，如 wifi firmware 的載入、command request 以及資料的傳送/接收。目前較為常用的界面為 4bit SDIO (Secure Digital I/O)。
啟動 wpa_supplicant。運行於 user space 下的一個 service，可以在 init.rc 下啟動並初始化這個 service。當然在啟動以及關閉 wifi 時也會一起啟動以及關閉。
建立 wpa_supplicant 以及 wifi kernel module 的 interface 作為實現 wifi 的各種操作如找尋適當 AP (Access Point)、secure method (WPA、WPA2 或 WEP) 或建立/解除與 AP 的連線。

在 user 透過 UI 去啟動 wifi 時，wifi 找不到任何 AP 且畫面一直停留在 scanning…的狀態。相信各位 wifi 開發者在 porting wifi driver 
時應該經常會遇到這樣的問題。或許有人會說是 AP 訊號太弱或是 security method 
軟體啟動流程也有可能出了問題


重新檢視上述啟動流程，可以發現 wifi kernel module 是在 kernel space 進行載入而 wpa_supplicant 是在 user space 下啟動的。如果要正確地控制其啟動流程，較常見的方法是程式中透過 cat /proc/modules。如果可以在 /proc/modules 中讀取到  module name，代表 wifi kernel module 已經載入完成。但顯然在筆者的開發經驗上，這樣的方法上並不能適用於所有的平台。在這樣的情況下，如果在 user space 中因為對 wifi kernel module 確實的載入完成時間有任何的誤判而提前啟動 wpa_supplicant，將會使得 wpa_supplicant 找不到 wifi device 而會有如以下的 error logs 出現

I/wpa_supplicant(  677): rfkill: Cannot open RFKILL control device

E/wpa_supplicant(  677): Could not read interface wlan0 flags: No such device

E/wpa_supplicant(  677): WEXT: Could not set interface ‘wlan0’ UP

E/wpa_supplicant(  677): wlan0: Failed to initialize driver interface


## p2p wifi-direct

sudo wpa_supplicant -D nl80211 -i wlp4s0 -c /etc/wpa_supplicant.conf -B
sudo wpa_cli












