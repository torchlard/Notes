# never install npm from source / in root ac
rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/npm*

__
# update to latest version
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

# The engine "node" is incompatible with this module
change node engine version

# npm problem: Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules
sudo npm i -g sqlite3 --unsafe-perm=true --alow-root

# Error: Please install sqlite3 package manually
npm i sqlite3 -D && rm -rf node_modules && npm i && npm rebuild










