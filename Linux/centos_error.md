# can't set the locale; make sure $LC_* and $LANG are correct

echo "LC_ALL=en_US.UTF-8" >> /etc/environment
echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
<!-- localectl set-locale en_US.utf8 -->









