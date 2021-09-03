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
-- UPDATE mysql.user SET Password=PASSWORD('NEW-PASSWORD') WHERE User='root';
create user 'root'@'%' identified by '666666';
alter user 'root'@'localhost' identified by '666666';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY PASSWORD '123456' WITH GRANT OPTION
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



alter user 'root'@'localhost' identified by '666666';
create user 'root'@'%' identified by '666666';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '666666' WITH GRANT OPTION;
flush privileges;


# move table
alter table old_db.tbl rename new_db.tbl

ALTER TABLE test ROW_FORMAT=DYNAMIC;
 watch --interval=1 "mysql -uroot -p666666 -h127.0.0.1 -e \"SELECT INFO FROM information_schema.PROCESSLIST p WHERE command != 'Sleep' AND info NOT like '%information_schema%'\" | column -t |tr -s ' '"









