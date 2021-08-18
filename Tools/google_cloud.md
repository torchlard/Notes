# connect to vm via ssh in local machine
1. generate ssh key locally
ssh-keygen -t rsa -f ~/.ssh/my-ssh-key -C [USERNAME]
2. chmod 400 ~/.ssh/my-ssh-key
3. save ssh value from `cat ~/.ssh/my-ssh-key.pub`
4. now you can connect via `ssh -i ~/.ssh/my-ssh-key lkit@<ip>`
 中繼資料 in google cloud to add ssh key

my google cloud: 35.185.168.177

# github error
remote: Permission to schrodog/5322-image-app.git denied to torchlard.
fatal: unable to access 'https://github.com/schrodog/5322-image-app.git/': The requested URL returned error: 403
$ git config credential.username 'schrodog'

# leave ssh while process running in server
ssh into the remote machine
$ tmux  
start the process you want inside the started tmux session
## detach
leave/detach the tmux session by typing Ctrl+b and then :detach
## attach
attach -t <work>

# git clear all unstaged changes
git checkout -- .

# change firefall rule
1. login google cloud account
gcloud auth login
2. open port 8000
gcloud compute firewall-rules create my-rule --allow tcp:8000




python3 run_test.py --content content/big_flowers.jpg --style_model models/the_scream.ckpt --output result.jpg






