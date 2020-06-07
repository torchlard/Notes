# normal ssh password mode
`ssh <username>@<ip>`

# public key authentification
trust and remember host's key when first connecting to it
- stored host keys in `known_hosts` in openssh

# ssh-agent
hold user's decrypted private key in memory, use it to authenticate logins
connection to ssh agent can be forwarded to a server => single sign-on

after `eval $(ssh-agent)`, run `ssh-add`


## key size
RSA: 2048 bits
ECDSA: 521 bit keys

## identity key location
stored in .ssh/ , eg. `.ssh/ssh_id_rsa`
store in another path: `ssh -i /home/ylo/secure/my-key ec2-user@awshost.domain`

## authorized key location
when user try to login, openssh server looks for authorized key 
- directory specified in `AuthorizedKeysFile` option
- move ssh keys to a root-owned location


1. sudo vim /etc/ssh/sshd_config
2. 

## openssh limit on num of private keys
counts testing whether particular key used as authentification
- if user has >5 keys in .ssh, only some work
=> adjust `MaxAuthTries` on server

## ssh key looks like
authorized key
```
ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBN+Mh3U/3We4VYtV1QmWUFIzFLTUeegl1Ao5/QGtCRGAZn8bxX9KlCrrWISIjSYAwCajIEGSPEZwPNMBoK8XD8Q= ylo@klar
```
identity key
```
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIJWbvSW7h50HPwG+bWR3DXgQ6YhOxYbe0ifr1rRUvsUuoAoGCCqGSM49
AwEHoUQDQgAE34yHdT/dZ7hVi1XVCZZQUjMUtNR56CXUCjn9Aa0JEYBmfxvFf0qU
KutYhIiNJgDAJqMgQZI8RnA80wGgrxcPxA==
-----END EC PRIVATE KEY-----

```


# steps
1. create ~/.ssh if not exists
2. chmod 700 ~/.ssh
3. ssh-keygen (keep all default)
=> id_rsa.pub: public key ; id_rsa: private key
4. ssh-copy-id -i ~/.ssh/id_rsa.pub <user>@<host>
- copy key from client to server, so as to ssh to server
5. change /etc/ssh/sshd_config
```
PasswordAuthentication no
PubkeyAuthentication yes
```
6. sudo service sshd restart
7. try: ssh <user>@<host>

# ssh forward
## local forwarding
forward port request client -> server machine

ssh client listen for connection on configured port, 
when receive connection, tunnels to SSH server

use: 
1. file transfer through jump servers
2. connect to service on internal network from outside

### example
`ssh -L 80:localhost:80 remote`

open connection to gw.example.com jump server,
forward any connection to port 80 local -> intra.example.com port 80


## remote forwarding
forward port request server -> client

`ssh -R 8080:localhost:80 public.example.com`
anyone on remote server connect to port 8080 on remote server
conn tunnel back to client host => make conn to port 80 on localhost
- other hostname / IP could be used instead of localhost

sshd_config can control

# encryption
openssl enc -aes-256-cbc -iter 2 -in file -out file.enc










