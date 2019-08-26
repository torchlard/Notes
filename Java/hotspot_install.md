# ref
https://hunterzhao.io/post/2018/01/29/compile-openjdk10-source-code-on-mac/

https://hunterzhao.io/post/2018/01/30/debug-openjdk10-source-code-on-mac-with-clion-ide/


# steps
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-9.0.4/bin/java 1
sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/jdk-9.0.4/bin/javac 1
sudo update-alternatives --install /usr/bin/javah javah /usr/lib/jvm/jdk-9.0.4/bin/javah 1

sudo update-alternatives --config java
sudo update-alternatives --config javac
sudo update-alternatives --config javah

sudo apt-get install systemtap-sdt-dev libx11-dev libxext-dev libxrender-dev libxtst-dev libxt-dev libcups2-dev libfontconfig1-dev libasound2-dev


bash configure --with-debug-level=slowdebug --enable-dtrace --with-jvm-variants=server --with-target-bits=64 --enable-ccache --with-num-cores=8 --with-memory-size=8000  --disable-warnings-as-errors

make images

./build/macosx-x86_64-normal-server-slowdebug/jdk/bin/java -version




















