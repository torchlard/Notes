# install
sudo apt-get install mercurial
$ hg clone http://hg.openjdk.java.net/jdk9/jdk9 jdk9
$ cd jdk9
$ bash get_source.sh   # 下载全部源代码
$ bash configure       # configure 编译环境，若编译报错，需要添加 `--disable-warnings-as-errors`
$ make images          # 编译 OpenJDK










