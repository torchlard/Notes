# W: An error occurred during the signature verification. The repository is not updated and the previous index files will be used. GPG error: https://repo.skype.com/deb stable InRelease: The following signatures were invalid: EXPKEYSIG 1F3045A5DF7587C3 Skype Linux Client Repository <se-um@microsoft.com>

sudo apt-key del 1F3045A5DF7587C3
curl https://repo.skype.com/data/SKYPE-GPG-KEY | sudo apt-key add -


#  The following signatures couldn't be verified because the public key is not available: NO_PUBKEY FEEA9169307EA071 NO_PUBKEY 8B57C5C2836F4BEB
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FEEA9169307EA071
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 8B57C5C2836F4BEB
