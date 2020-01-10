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








