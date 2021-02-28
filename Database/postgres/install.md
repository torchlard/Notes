## login as admin
sudo -u postgres psql

createuser lkit
alter user lkit with superuser

sudo su - postgres


## init password
sudo su - postgres
\password


The problem is still your pg_hba.conf file (/etc/postgresql/9.1/main/pg_hba.conf). This line:

local   all             postgres                                peer

Should be

local   all             postgres                                md5

After altering this file, don't forget to restart your PostgreSQL server. 
f you're on Linux, that would be sudo service postgresql restart.


# createdb with user
createdb mydb -U ade

# login to db
psql -d mydb -U ade


# start
jdbc:mariadb://127.0.0.1:3306

/usr/lib/postgresql/12/bin/pg_ctl -D /var/lib/postgresql/12/main -l logfile start















