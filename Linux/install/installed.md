# gnome
sudo apt-get install adb chromium-browser-l10n g++ gimp git gnome-tweak-tool gzip ibus-rime jupyter-notebook kdenlive krita latexmk lm-sensors lshw make memtest86+ mesa-common-dev mesa-va-drivers mesa-vdpau-drivers ntfs-3g obs-studio okular openssh-client openssl openvpn psensor ssh tex-common texlive-base tree unrar unzip vim virtualbox vlc wireshark wpasupplicant zsh qt-at-spi curl openjdk-8-jdk openjdk-12-jdk

# kde
sudo apt-get install adb g++ gimp gzip jupyter-notebook kdenlive krita latexmk lm-sensors lshw make memtest86+ mesa-common-dev mesa-va-drivers mesa-vdpau-drivers ntfs-3g obs-studio okular openssh-client openssl openvpn psensor ssh tex-common texlive-base tree unrar unzip vim virtualbox vlc wireshark wpasupplicant zsh openjdk-8-jdk openjdk-11-jdk openjdk-13-jdk

# install by other means
## oh my zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
## mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
## nodejs
sudo apt-get install npm
sudo npm i -g n yarn typescript
sudo n latest

## gradle
curl -s "https://get.sdkman.io" | bash
// config .zshrc using .bashrc
sdk install gradle 5.4.1


## others
sbt
scala
mono-4.0-gac
nodejs

dbeaver
gradle


# make qt follow system wide gtk theme
<!-- 1. install qtconfig-qt4 -->
sudo apt-get install qt5-style-plugins qt5ct
sudo sh -c "echo 'QT_QPA_PLATFORMTHEME=qt5ct' >> /etc/environment"

setup config

# gnome fractional scaling
gsettings set org.gnome.mutter experimental-features "['x11-randr-fractional-scaling']"

# copy /usr/share/icons
sudo cp -r /media/lkit/7ac42414-61e5-4f3c-8c00-bee4add272d3/usr/share/icons/Papirus* /usr/share/icons

# firefox dark mode
shadowfox


# chrome
curl -sS https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/google.list
sudo apt upgrade
sudo apt install google-chrome-stable







