# safety measures
1. don't give anyone access to user table in mysql system db
2. access privilege
- grant, revoke
3. do not store cleartext password, use SHA2()
- to avoid rainbow table, use `hash(hash(password)+salt)`
4. don;t choose password from dictionary
5. firewall, put MySQL in DMZ
6. don't trust any data entered by user
7. don't transmit unencrypted data over internet
- use SSL, SSH port-forwarding


# attack method
## rainbow table
stored lots of common password and their hash, much faster to crack password

# change password
use mysql;
alter user 'root'@'localhost' identified by 'xxx';
flush privileges;



















