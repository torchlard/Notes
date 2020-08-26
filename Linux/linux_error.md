# no soundcard found 
As I said the sound driver I was running was sof-audio-pci, which had no normal firmware at the moment.

I searched nearly 3 hours trying to solve this headache and finally found the solution, just disable this "sof" driver and fall back to intel:

Do:

sudo gedit /etc/default/grub
Change

GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
to:

GRUB_CMDLINE_LINUX_DEFAULT="quiet splash snd_hda_intel.dmic_detect=0"
Then do:

sudo update-grub
and Reboot.

You can check if soundcards are detected with:

aplay -l










