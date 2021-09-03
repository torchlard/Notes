# forget root password
Start server

`sudo service mysql start`
Go to sock folder

`cd /var/run`
Back up the sock

`sudo cp -rp ./mysqld ./mysqld.bak`
Stop server

`sudo service mysql stop`
Restore the sock

`sudo mv ./mysqld.bak ./mysqld`
Start mysqld_safe

`sudo mysqld_safe --skip-grant-tables --skip-networking &`
Init mysql shell

`mysql -u root`
Change password

`FLUSH PRIVILEGES;`
`ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';`

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



# Unable to load authentication plugin 'caching_sha2_password'
alter user 'root'@'%' identified with mysql_native_password by '123456';


# Unknown system variable 'query_cache_size'
# Unknown system variable 'tx_read_only'
# Unknown system variable 'language'
reason: mysql driver version not matched
solution: add dependency

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.15</version>
</dependency>
```

# /usr/bin/mysqladmin: connect to server at 'localhost' failed                                         
# error: 'Access denied for user 'root'@'localhost' (using password: NO)' 
mysqladmin -u root -p password '123456'



# Illegal mix of collations for operation 'UNION'



# Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)
sudo service mysql restart

#  Lock wait timeout exceeded; try restarting transaction



# The user specified as a definer does not exist


# MySQL 8.0 - Client does not support authentication protocol requested by server; consider upgrading MySQL client
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<your pwd>'
flush privilegs;

# Column count of mysql.user is wrong. Expected 42, found 44. The table is probably corrupted
mysql_upgrade -uroot -p





