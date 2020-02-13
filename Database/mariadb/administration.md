# show
provide info about db, tables, columns, status info about server

## show create
database, event, package, package body, procedure, table, trigger, view


# log
show engine innodb status|mutex


# change mariadb root password
`sudo systemctl stop mariadb`
`sudo mysqld_safe --skip-grant-tables &` connect without a password and with all privileges 
also enable `--skip-networkingoption`: prevent the other clients from connecting to the database server. 
`mysql` login as root

```sql
UPDATE mysql.user SET Password=PASSWORD('NEW-PASSWORD') WHERE User='root';
FLUSH PRIVILEGES;
```
`sudo mysqladmin -u root -p shutdown` shutdown the running database server
`sudo systemctl start mariadb`

`mysql -u root -p` verify


# mariadb installed without init password
`sudo mysql -u root`
```sql
use mysql;
update user set plugin='' where User='root';
flush privileges;
```
`sudo mysql_secure_installation`


# variable
## session variable
user-defined variable start with @
`set @messsage = 'current datetiem is';`




















