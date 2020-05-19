# remove files commited in repository
git rm --cached `git ls-files -i --exclude-from=.gitignore` 
git commit -m 'Removed all files that are in the .gitignore' 
git push origin master


# switch to ssh connection
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

# remove all uncommitted change
git reset --hard HEAD

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


# push to ec2
// in ec2
git init --bare

// in local
git remote add ec2 <host-from-ssh-config>:/path/to/project_dir.git
git push ec2 master

git remote remove origin
git remote add origin <original-git>

# add files except 1
git add -u
git reset -- xxx/xxx.js







