# command
track files `svn add <file>`
commit `svn commit . -m "<msg>"`
update to latest version `svn up`

view last 5 logs `svn log -l 5`


# TortoiseSVN
## protocol
http, https, svn, svn + ssh, file, svn + XXX

## functions
create graph of all revision/commit
commit statistics



# Process
1. create user tom
htpasswd -cm /etc/svn-users tom
htpasswd -m /etc/svn-users jerry
2. create subversion parent directory
mkdir /var/www/svn
3. repository setup
svnadmin create project_repo


# Lifecycle
1. create repository

2. checkout
- create working copy from repo
`svn checkout svn://192.168.1.1/pro/domain`

3. update
- update working copy
`svn update -r 200 test.php`
(update to version 200)
(if no directory, default current directory and all subdir update to newest )

4. perform changes
- after checkout, do various ooperations to perform change
- edit existing file +- content from file

5. review changes
- after chaning your working copy -> newer than repo
- good to review changes before 'commit'
- "status": list modification that made to working copy

6. fix mistakes
- throw away changes

7. resolve conflicts
- 'merge' auto handle everything safely, everything else considered conflict
`svn resolved`

8. commmit changes
- apply changes from working copy to repo



# Version control system
centralized | distributed VCS
repository: store files and history
trunk: directory where main development happens
tag: store named snapshots of projects
branches: create another line of development
working copy: snapshot of repo
commit change: store change from private workplace to central server



# command
## checkout
svn checkout svn://192.168.1.1/pro/domain

## add file
svn add test.php

## commit
svn commit -m "add something" test.php

## lock / unlock
svn lock -m "lock test file" test.php
svn unlock path

## update to certain version
svn update -r 200 test.php
(update to version 200)
(if no directory, default current directory and all subdir update to newest )

## check file or directory status
svn status path
svn status -v path

- even if no network
can run `svn status`, `svn diff`, `svn revert`

## delete file
svn delete path -m "delete test file"

## view log
svn log test.php

## check detail log
svn info test.php

## compare difference
svn diff path
svn diff -r 200:201 test.php   (compare version 200 to 201)

## merge
svn merge -r 200:205 test.php   
(merge difference among version 200-205 to current file)
(may need to manage conflict beforehand)

## help
svn help









