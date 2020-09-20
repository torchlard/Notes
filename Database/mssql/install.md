https://www.liquidweb.com/kb/how-to-install-microsoft-sql-on-linux/

add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/18.04/mssql-server-2019.list)"

apt-get install mssql-tools msodbcsql17 mssql-server
export PATH="$PATH:/opt/mssql-tools/bin"


root pwd: Test1234#


