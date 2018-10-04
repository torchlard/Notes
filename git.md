# remove files commited in repository
git rm --cached `git ls-files -i --exclude-from=.gitignore` 
git commit -m 'Removed all files that are in the .gitignore' 
git push origin master


# switch to ssh connection
no need to re-enter password

commands:
git remote -v     // check existing url
git remote set-url origin git@github.com:USERNAME/REPO.git  // new ssh url
// do following if no key installed
ssh-keygen -t rsa -b 4096   // generate new key, cannot copy from old file
ssh-add ~/.ssh/xxx  // add key to system
xclip -sel clip < ~/.ssh/xxx.pub    // copy key content to clipboard
go to setting > SSH and GPG keys > New SSH key, paste key content




