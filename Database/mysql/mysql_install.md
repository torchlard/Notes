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


# change mariadb root password
For MariaDB:

$ sudo systemctl stop mariadb

##
Next, restart the database server without permission checking using the following command:

$ sudo mysqld_safe --skip-grant-tables &

Here, the --skip-grant-tablesoption allows you to connect without a password and with all privileges. 
If you start your server with this option, it also enables --skip-networkingoption which is used to prevent the other clients from connecting to the database server. 
And, the ampersand (&) symbol is used to run the command in background, so you could type the other commands in the following steps. 
Please be mindful that the above command is dangerous and your database server becomes insecure. You should run this command only for a brief period to reset the password.

##
Next, login to your MySQL/MariaDB server as root user:

$ mysql

- At the mysql> or MariaDB [(none)]> prompt, run the following command to reset the root user password:

UPDATE mysql.user SET Password=PASSWORD('NEW-PASSWORD') WHERE User='root';

- Replace NEW-PASSWORD in the above command with your own password.
- Then, type following commands to exit from the mysql console.

FLUSH PRIVILEGES;
exit

##
Finally, shutdown the running database server that you started earlier with --skip-grant-tablesoption. To do so, run:

$ sudo mysqladmin -u root -p shutdown

You will be asked to enter your mysql/mariadb root user password that you set in the previous step.

Now, start mysql/mariadb service normally using command:

$ sudo systemctl start mysql

For MariaDB:

$ sudo systemctl start mariadb

Verify if the password has really been changed using the following command:

$ mysql -u root -p


# mariadb installed without init password
$ sudo mysql -u root

[mysql] use mysql;
[mysql] update user set plugin='' where User='root';
[mysql] flush privileges;
[mysql] \q

$ sudo mysql_secure_installation





































