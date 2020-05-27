# restart ssh
service sshd restart

# network
apk add ip6tables
apk add -u awall

# mysql
apk add mariadb-server
apk add mariadb-client

need to change config, allow network connectivity

# package management
install `apk add xxx` (ignore version number)
search `apk search xxx`
`apk update`
`apk upgrade`

