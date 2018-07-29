I have similar problem, I've upgraded on Ubuntu 16.04 from MongoDB 3.4 to 3.6 but I missed this important step

db.adminCommand( { setFeatureCompatibilityVersion: "3.4" } )

Then I must downgrade to 3.4 to do it and then upgrade to 3.6 again. Here is the detail steps:

1. Uninstall 3.6

Backup /etc/mongod.conf
Backup /etc/apt/sources.list.d/mongodb-org-3.6.listed (rename or move it to another folder)

sudo apt-get update
sudo apt remove mongodb-org-mongos mongodb-org-server mongodb-org-shell mongodb-org-tools

2. Re-install 3.4
Check folder /etc/apt/sources.list.d/ to see if this file exists or not: mongodb-org-3.4.list. If it does not exist, you can re-create by this command:

echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.0.5 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.5.list

then install by apt-get

sudo apt-get update
sudo apt-get install -y mongodb-org
mongod --version
sudo systemctl start mongod

In my case the command systemctl start mongod return error Failed to start mongod.service: Unit mongod.service not found I resolved by these commands:

sudo systemctl enable mongod
sudo service mongod restart
sudo service mongod status

3. Execute very important command
After downgrade to 3.4, run this

mongo
MongoDB shell version v3.4.10
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.10
> db.adminCommand( { setFeatureCompatibilityVersion: "3.4" } )
{ "featureCompatibilityVersion" : "3.4", "ok" : 1 }
> exit

4. Upgrade 3.6 again
Restore this file /etc/apt/sources.list.d/mongodb-org-3.6.listed

sudo apt-get update
sudo install mongodb-org-mongos
sudo install mongodb-org-server
sudo install mongodb-org-shell
sudo install mongodb-org-tools

Restore /etc/mongod.conf. Now, MongoDB 3.6 started without any problem


echo "deb [ arch=amd64,arm64 ] deb https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list



# insert new field
db.account.update({_id:154}, {$set: {username: 'peter'}})




