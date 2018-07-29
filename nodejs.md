# never install npm from source / in root ac
rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/npm*

__
# update to latest version
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

