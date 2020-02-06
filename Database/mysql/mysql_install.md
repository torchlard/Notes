# uninstall
sudo apt-get remove xxx
sudo apt-get --purge remove "mysql*"
sudo apt-get --purge remove "mariadb*"

## clear everything in
sudo rm -rf /var/lib/mysql
sudo rm -rf /etc/mysql

# restart wsl
net stop LxssManager
net start LxssManager


# install
sudo apt-get install mariadb-server-10.3


# move data to another disk
(assume new disk location = /mnt/d/)
1. Stop the mysql server
sudo service mysql stop

2. Create the new directory
mkdir /mnt/d/mysql

3. Copy over ONLY the database folders
sudo cp -R /var/lib/mysql /mnt/d/mysql
<!-- sudo cp -R /var/lib/mysql/users /array2/mysql -->

4. Backup the my.cnf file
sudo cp /etc/mysql/my.cnf /mnt/d/my.cnf.backup

5. Edit the my.cnf file:
sudo vim /etc/mysql/my.cnf

- Change all mentions of the old datadir and socket to your new location
```
datadir=/array2/mysql
socket=/array2/mysql/mysql.sock
```
6. Rename the old directory
sudo mv /var/lib/mysql /var/lib/mysql-old

7. Create a symlink, just in case
sudo ln -s /mnt/d/mysql /var/lib/mysql 

8. Update the directory permissions
sudo chown -R mysql:mysql /mnt/d/mysql
sudo chown -R mysql:mysql /var/lib/mysql

<!-- Let AppArmor know about the new datadir:
echo "alias /var/lib/mysql/ -> /your/new/datadir/," >> /etc/apparmor.d/tunables/alias
Reload the apparmor profiles
sudo /etc/init.d/apparmor reload -->

9. Then start mysql:
sudo service mysql start




# basedir
path to installation directory
all paths resolved relative to this

# datadir
path to db root data files

# tmpdir
place temp file for transactions
































