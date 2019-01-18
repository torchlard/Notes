# restart_policy Additional property restart_policy is not allowed
incorrect indentation for "restart_policy" 

# /usr/local/bin/docker-machine: 8: /usr/local/bin/docker-machine: Syntax error: newline unexpected
reason: file downloaded via proxy, receive plain html instead of binary
solution: download file directly through browser, then run later commands to install

# Unable to get the local Boot2Docker ISO version:  Did not find prefix "-v" in version string
reason: no -v in binary file
solution: add -v xxx at the end
printf '\x2D\x76\x31\x38\x2E\x30\x39\x2E\x30\x20' | dd of=boot2docker.iso bs=1 seek=32819 count=10 conv=notrunc 

# got permission denied while trying to connect to the Docker daemon socket
reason: current user has no privilege to read/write file
solution: add user to docker group
$ sudo gpasswd -a ${USER} docker
$ sudo service docker restart
$ newgrp - docker





