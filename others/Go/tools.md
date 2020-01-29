# install
```bsh
sudo add-apt-repository ppa:longsleep/golang-backports
sudo apt-get update
sudo apt-get install golang-go
```
download manually
`tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz`
add to .bashrc/.zshrc
`export PATH=$PATH:/usr/local/go/bin`

```
export GOROOT="/usr/local/go"
export GOPATH="$HOME/go"
```

# build
cd src/hello
go build


# command
build: compile packages and dependencies
clean: remove object files and cached files
env: print env info
fix: update package to use new api
fmt: reformat source
get: add dependency
install: compile and install packages
list
run: compile and run














