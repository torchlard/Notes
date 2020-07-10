# enable repo
yum-config-manager --enable elasticsearch


# install extra package
yum install -y epel-release

# list all available version
yum list docker-ce --showduplicates | sort -r








