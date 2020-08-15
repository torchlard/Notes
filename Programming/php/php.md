1. install apache2, php7.0, libapache2-mod-php7.0
2. if the html code ocntains php, put it under /var/www/html
3. name html file with .php
4. run in browser
--------------

# static keyword allow local variable not deleted
# cosntant
define ("greeting","welcome");
echo greeting;

# array (list)
$arr = array("a","b","c");

#associative array (has/dictionary/key-value pair)
$arr = array("a"=>1,"b"=>2,"c"=>3);

#GLOBALS
$x=1; $y=2;
function addition(){
    $GLOBALS['z']=$GLOBALS['x']+$GLOBALS['y'];
}
addition();
echo $z;

# send data
<form action="URL">
eg. <form action="/action_page.php" method="get">
=> will send data to action_page.php by 'get' method

# process user data
1. prevent hacker code injection
2. trim unnecessary characters (white space, tab, newline)
3. remove \

# regex
count: *+?
position: ^$
special char: \d \w \s
basic: match all inside /.../

# could not find driver error
if just installed driver, restart apache








