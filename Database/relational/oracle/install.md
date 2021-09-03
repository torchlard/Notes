# local 

sudo apt-get install -y ksh
sudo apt-mark hold libaio-dev lesstif2 lesstif2-dev pdksh libpthread-stubs0 lsb-cxx

sudo ln -s /lib/x86_64-linux-gnu/libgcc_s.so.1 /lib64/libgcc_s.so.1
sudo ln -s /lib/libgcc_s.so.1 /lib/libgcc_s.so


su oracle // switch to oracle usere

## Oracle Settings
export TMP=/tmp;
export TMPDIR=$TMP; 
export ORACLE_HOSTNAME=127.0.0.1; 
export ORACLE_BASE=/home/lkit;
export ORACLE_HOME=$ORACLE_BASE/oracle; 
export ORACLE_SID=sid; 
export ORACLE_UNQNAME=$ORACLE_SID;
export PATH=/usr/sbin:$ORACLE_HOME/bin:$PATH; 
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib:/usr/lib64; 
export CLASSPATH=$ORACLE_HOME/JRE:$ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib;



oracle pwd: Aa123456

# docker


