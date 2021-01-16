# restart wsl (powershell run as administrator)
Get-Service LxssManager | Restart-Service 

# ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running?
don't use sudo to run `docker-compose up -d`

# docker-compose version not support
install latest version of docker-compose

# install ubuntu desktop
1. install vcxsrv in windows
2. 
export DISPLAY=localhost:0.0
sudo apt install ubuntu-desktop
sudo apt install yad

# share ssh key with WSL
mv ~/.ssh /c/Users/xxx
ln -s /c/Users/xxx/.ssh ~/.ssh

# allow window files to retain linux permission
vim /etc/wsl.conf
```
[automount]
root = /    # change fs mountpoint to /
options = "metadata"
```

# config k8s
mkdir -p ~/.kube
ln -sf /c/users/<YOUR_USER>/.kube/config ~/.kube/config


# run cmd
cmd.exe /c xxx.bat
powershell.exe xxx


# install windows docker with WSL 1
1. install window version of docker
2. enable hyper-v
3. tick 'Expose daemon on tcp://localhost:2375 without TLS' in docker setting
4. run in bash
sudo apt update
sudo apt install docker.io
sudo usermod -aG docker $USER

5. write to ~/.profile
export DOCKER_HOST=127.0.0.1:2375
6. source ~/.profile
7. test using `docker run hello-world`
8. install docker-compose





