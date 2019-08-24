# install
sudo apt-get install mercurial

hg clone http://hg.openjdk.java.net/jdk10/master openjdk10

bash configure --with-debug-level=slowdebug --enable-dtrace --with-jvm-variants=server --with-target-bits=64 --enable-ccache --with-num-cores=4 --with-memory-size=8000  --disable-warnings-as-errors

make images

# hotspot src
agent: serviceability agent
make: config
src
- cpu
- os
- os_cpu
- share : platform independent
  - tools
    - hsdis: reverse assembly
    - IdealGraphVisualizer : visualize middle code
    - launcher








