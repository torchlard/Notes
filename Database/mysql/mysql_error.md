# forget root password
Start server

$ sudo service mysql start
Go to sock folder

$ cd /var/run
Back up the sock

$ sudo cp -rp ./mysqld ./mysqld.bak
Stop server

$ sudo service mysql stop
Restore the sock

$ sudo mv ./mysqld.bak ./mysqld
Start mysqld_safe

$ sudo mysqld_safe --skip-grant-tables --skip-networking &
Init mysql shell

mysql -u root
Change password

FLUSH PRIVILEGES;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';

# not allow insert local file data
reason: not enabled
solution: 
add `loose-local-infile=1` in mysql.cnf
restart mysql service
`SET GLOBAL local_infile = 'ON';` in DB
for DBeaver, add in driver url config


# mysql public key retrieval is not allowed
change db setting

# where is my.cnf
locate my.cnf

# SQL Error [3009] [HY000]: Column count of mysql.user is wrong
reason: incompatible version?
solution: mysql_upgrade --force -uroot -p






# how to install mariadb correctly
sudo apt-get remove --purge mysql-\*
sudo apt-get install mysql-server mysql-client
sudo apt-get install mariadb-server mariadb-client
sudo mysql_secure_installation






















