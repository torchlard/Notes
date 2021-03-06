# grep
global search regular expression
`select * from table`

-i: case insensitive
-v: not show matching
-o: each line
-E: extended regex

## example
`echo "1234 7654" | grep -oE "[0-9]4|76"` 


# awk
locate data line, get section
`select field from table`

awk 'pattern{action}'
$0: original line
$N: nth line segment
$NF: last line segment

BEGIN{FS="_"} / -F: separator

## example

# sed
stream editor
change data
`update table set field=new where field=old`


# 2>&1
file descriptor 1: stdout
file descriptor 2: stderr

`2>1` redirect stderr to file named 1
`2>&1` redirect stderr to file descriptor 1
`&2>&1`: command `&` + command `2>&1`


# if then else
if [[ -e $file ]]; then echo 'a'; fi
[ -e $file ] && echo 'a'

# date
second since epoch `date +%s`
show certain day `date -d "2019-02-01"`

# PS1
SGR param 30-37 select foreground; 40-47 background
few terminal implement bold as brighter color


## Foreground colors
90   Dark gray  
91   Light red  
92   Light green    
93   Light yellow   
94   Light blue 
95   Light magenta  
96   Light cyan  

## Background colors
100  Dark gray  
101  Light red  
102  Light green    
103  Light yellow   
104  Light blue 
105  Light magenta  
106  Light cyan 

most GUI terminal support 256 color

## param
\u: username
\h: hostname
\W: path
\$: $ for normal user, # for root

export PS1="\033[01;32m[\u@\h \W]# \033[0m"

# change shortcut
show shortcut `stty -a`
set ctrl-k as interrupt `stty intr \^k`

# restart process if failed
```bash
while true
do
  mongod -f /etc/mongod.conf
  sleep 10
done
```
# ~/.profile
default shell (Bourne shell) reads commands from ~/.profile when invoked as login shell
bash is Bourne-like shell, reads commands from ~/.bash_profile
  - if file not exist, read ~/.profile
can invoke shell directly at any time

login shell => doesn't read ~/.profile
interactive shell (not run script) => reads ~/.bashrc

.profile: apply to whole session
.bashrc: apply only to bash itself, eg. alias, function def, shell options
.bash_profile: can replace ~/.profile, but only read by bash, not any other shell

# parallel
while xxx
do {
  xxx
  WAITPID="$WAITPID $!"
} &
done <<< "$xxx"
wait $WAITPID







