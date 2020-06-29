# theory
most other systems store information as list of file-based chagnes (delta-based version control)
Git thinks data more like series of snapshots of filesystem
  - if files not changed, git doesn't store file again, just link to previous identical file

most operations in Git need only local files and resources to operate (almost instaneous)
eg. to browse history of project, no need go to server
can do local commits when offline

## integrity
everything in Git is checksummed before stored
impossible to change contents of any file/dir without Git knowing (checksum: SHA-1 hash)

when do actions in Git, all of them only add data to Git database
for any VCS, can lose / mess up changes you haven't committed
after commit snapshot into git, very difficult to lsoe

# Three States
1. modified: changed file, not commmitted to local db
2. staged: marked modified file in current version, go into next commit snapshot
3. committed: data is safely stored in local db

working tree = single checkout of one version of project
files pulled out of compressed db in Git directory, place on disk for use

staging area: a file contained in Git directory
  - stores informaiton about what will go into next commit
  - can call "index"

Git dir: store metadata, object database 

## workflow
1. modify fiels in working tree
2. selectively stage just those changes want in next commit
3. do commit, takes files in staging area, store snapshot permanently to Git directory

if particular version of files in Git directory, considered committed

# config
/etc/gitconfig
~/.gitconfig
.git/config


## protocol
https://, git://, user@server:path/to/repo.git

## pattern
a/**/z
[0-9], [abc]
if not recursive, start from `/`

`!lib.a` ignore .a files

# git diff
only show unstaged changes 

# remove file
to remove file from Git, need to remove from tracked files (staging area), then commit
`git rm` remove file (auto git add)


# revert
## untrack file
keep file in disk, but remove tracking
`git rm --cached <file>`

## redo commit
```
git commit -m "initial commit"
git add forgotten_file
git commit --amend
``` 
redo that commit, make additional changes

## revert latest 2 published commit
git revert HEAD~2..HEAD

## unstaging staged file
`git reset HEAD <file>`

## remove all uncommitted change
git reset --hard HEAD

## unmodifying modified file
`git checkout -- <file>`
`git checkout -- .` revert all

## remove files commited in repository (by adding entry in .gitignore)
git rm --cached `git ls-files -i --exclude-from=.gitignore` 
git commit -m 'Removed all files that are in the .gitignore' 
git push origin master



# move files
git don't explicitly track file movements
`git mv old_file new_file`

# git log
`git log -p -2`
`git log --pretty=format:"%h - %an, %ar : %s"`
git log --sinze=2.weeks

author: person who originally wrote the work
committer: person who last applied the work

# git add
## add files except 1
git add -u
git reset -- xxx/xxx.js

## interactive
git add -i
>> choose 2, type 1,2,3 (if want to add file 1,2,3)
>> press enter again, back to menu


# revert file
git checkout -- <filename>

git config [--global|--local] --list

git config [--global|--local] user.name "xxx"
git config [--global|--local] user.email "xxx"


# personal access token 
use https protocol
username: as usual
pwd: access token

clear setting `git config --global --unset credential.helper`

# file status
tracked: file previously staged or committed
untracked: file not been staged or committed
ignored: file git explicitly told to ignore

# remote
## command
git remote rename pb paul

## push to ec2
// in ec2
git init --bare

// in local
git remote add ec2 <host-from-ssh-config>:/path/to/project_dir.git
git push ec2 master

git remote remove origin
git remote add origin <original-git>

## switch to ssh connection
no need to re-enter password

commands:
```bsh
git remote -v     // check existing url
git remote set-url origin git@github.com:USERNAME/REPO.git  // change existing url
git remote add origin git@github.com:USERNAME/REPO.git  // new ssh url
```

// do following if no key installed
```bsh
ssh-keygen -t rsa -b 4096   // generate new key, cannot copy from old file
ssh-add ~/.ssh/xxx  // add key to system
xclip -sel clip < ~/.ssh/xxx.pub    // copy key content to clipboard
go to setting > SSH and GPG keys > New SSH key, paste key content
```
## git clone
instead of only getting copy of existing repo, clone full copy of all data from server
`git clone https://xxx/libgit2 mylibgit` rename git repo

## git fech
fetch all information that remote repo has but not in local repo
`git fetch <remote-branch>`


# tag
tag specific points in repo history as being important
`git tag` `git tag -l "v1.8.5*"` list tag

## lightweight
very much like branch that doesn't change (pointer to specific commit)
`git tag v1.4`

## annotated
stored as full objects in Git db, checksummed, contain all metadata
`git tag -a v1.4 -m "my version 1.4"`

## checkout tag
`git checkout v2.0.0`
to view versions of files a tag pointint to, do git checkout

`git checkout master` back to original master branch

# alias
can setup alias for each command
`git config --global alias.br branch`

# branch
when stage, store version of file in Git repo (blobs)
when commit, checksums each subdirectory, store them as tree object
  - then creates commit object having metadata and pointer to root project tree
  - can re-create snapshot

default branch is master, everytime commit msater branch pointer moves forward automatically

## create new branch
create new pointer to move around
`git branch testing`

special pointer called `HEAD`: track which branch currently on

## switching branch
`git checkout testing` move HEAD pointer to testing branch

branch in Git = simple file contains 40 chars checksum of commit points to
  - VS other VCS copying all project's files into secondary directory

`git checkout -b iss53` == `git branch iss53; git checkout iss53`
create new branch and switch to it 

## merge branch
```
git checkout master
git merge <branch-name>
```
instead of just moving branch pointer forward, create new snapshot that result from merge
  - auto create new commit that points to it (merge commit)

suggest to merge branch first, then delete it (eg. hotfix branch)
`git branch -d b2`

## list remote branch
git fetch --all
git branch -r

## origin/master
master: branch in local repository
remotes/origin/master: branch named `master` on remote named `origin`
  - can refer as `origin/master`

`git diff origin/master..master` show diff between local master and remote master

## merge conflict
when conflict occur Git won't auto create new merge commit, but puse until resolve conflict

## delete remote branch
`git push origin --delete serverfix`

# rebase
2 ways to integrate changes from one branch into another: merge, rebase

rebase: take patch of changes introduced in other branch and reapply on top of current branch

1. go to common ancestor of 2 branches
2. get diff introduced by eachcommit of branch you're on
3. save diffs to temp files
4. reset current branch to same commit as branch rebasing onto
5. apply each change in turn

```
git checkout experiment
git rebase master
git checkout master
git merge experiment
```
now snapshot pointed to resultant commit = pointer to start of master
no difference in end product of integration, rebase make cleaner history
=> looks like linear history

`git rebase --onto master server client`
1. take client branch, figure out patches since diverged from server
2. replay patches in client branch, as if based directly off master branch
then `git checkout master; git merge client`

don't rebase commits that exist outside your repo and that people may have based work on
  - when you rebase stuff, you abadon existing commmits and create new ones similar but different
  - if push commits somewhere, and others pull them down
  - then you rebase sth and push again, your collaborators have to re-merge their work 

## rebase VS merge
w different ways to look at commit history
1. record of what actually happened
2. sotry of how your project was made


# remote server
remote repository is generally bare repository (no working directory)
no reason to have snapshot checked out on disk (just Git data)
  - just contents of .git directory, nothing else

## protocol
### local protocol
remote repo in another directory on same host
used if everyone has access to shared filessytem such as NFS mount

```
git clone /srv/git/project.git    // always better
git clone file:///src/git/project.git  // fires up process to transfer data, much less efficient
git remote add local_proj /srv/git/project.git
```
#### pros
simple, use existing fiel permissions and network access

#### cons
shared access more difficult to setup and reach from multiple locations
not protect against accidental damage

## HTTP
### smart HTTP
operate very similarly to SSH/git protocol, runs over standard HTTPS ports
can use various HTTP authentication

### dump HTTP
if not respond with HTTP smart, fall back to simple dump HTTP
expects bare Git repo served like normal files from web server
put bare Git repo under HTTP document root, setup specific post-update hook

```
cd /var/www/htdocs/
git clone --base /path/to/git_project gitproject.git
cd gitproject.git
mv hooks/post-update.sample hooks/post-update
chmod a+x hooks/post-update
```

### SSH
`git clone ssh://[user@]server/project.git`

#### cons
doesn't support anonymous access to Git repo

## Git protocol
special daemon that comes packed with Git
listen on dedicated port (9418) taht provides service similar to SSH protocol
for repo to be served over git protocol, must create git-daemon-export-ok file

no security, available for everyone to clone or not

### pros
fastest network transfer protocol available

### Cons
lack of authentication, usually pair with SSH/HTTPS access

# getting git on server
`git clone --bare my_project my_project.git`

git daemon --reuseaddr --base-path=/srv/git /srv/git/


# Distributed git
## centralized workflow
one central hub/repo that can accept code, everyone synchronize work with it

## Integrated manager workflow
each developer has write access to own public repo, read access to everyone else
include canonical repo that represents "official" project

1. create own public clone of project, push changes to it
2. send request to maintainer of main project to pull your changes
3. maintainer can add your repo as remote, test changes locally, merge into their branch

## Dictator and Lieutenants workflow
generally used by huge projects with hundreds of collaborators (eg. Linux kernel)

lieutenants: various integration managers in charge of certain parts of repo 
all lieutenants have 1 integation manager (benevolent dictator)

1. regular developer work on topic branch, rebase their work on top of master
  - master = reference repo that dictator pushes
2. Lieutenants merge developers' topic branches into their master branch
3. dictator merge lieutenants' master branches into dictator's master brnch
4. dictator push master to reference repo so other developers can rebase on it















