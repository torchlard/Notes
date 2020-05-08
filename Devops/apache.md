# directory
apache2.conf
- main conf file, put pieces together

ports.conf
- include from main conf, determine listening ports for incoming connection

conf-available/

conf-enabled/
  - link to conf-available
  - charset, error-page, vhost-access-log, security, serve-cgi-bin

mods-available/

mods-enabled/
  - link to mods-available files
  - alias, auth, autoindex, deflate
  - dnssd, filter, env, mine, php7.2
  - setenvif, status

sites-available/

sites-enabled/
  - link to sites-available file

## module
conf activated by symlinking available conf files
managed by using a2enmod/a2dismod, a2ensite/a2dissite, a2enconf/a2disconf



# command
start/stop with /etc/init.d/apache2 OR apache2ctl


# cgi
sudo a2enmod cgi
"edit file conf-enabled/serve-cgi-bin.conf 's path"
sudo systemctl restart apache2

access `http://localhost/cgi-bin/<xx.cgi>`


# error
## if occur js file 403 forbidden in apache
chown -R www-data:www-data <web directory>
adduser $USER www-data
chmod -R 775 <web directory>

## $APACHE_RUN_DIR empty
source /etc/apache2/envvars







