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
add `loose-local-infile=1`
`set GLOBAL local_infile =1;` in DB


# mysql public key retrieval is not allowed


# where is my.cnf
locate my.cnf














