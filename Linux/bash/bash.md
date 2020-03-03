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












