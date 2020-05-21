# confirm installed tomcat
go to localhost:8080

#webapp root directory
/var/lib/tomcat8/webapps

# environment
CATALINA_HOME=/usr/share/tomcat8

#ubuntu env
set META-INF/ instead of WEB-INF/

#start page
localhost:8080/<root-dir-name>/...

# compile source code :: (-d:where .class files place)
(no need to compile jsp)
javac -classpath /usr/share/tomcat8/lib/servlet-api.jar:classes:. -d classes src/com/example/web/BeerSelect.java
javac -d classes src/com/example/model/BeerExpert.java
-------
javac -d classes src/com/example/Dog.java
javac -classpath /usr/share/tomcat8/lib/servlet-api.jar:classes:. -d classes src/com/example/MyServletContextListener.java
javac -classpath /usr/share/tomcat8/lib/servlet-api.jar:classes:. -d classes src/com/example/ListenerTester.java


#tomcat web admin user info
/etc/tomcat8/tomcat-users.xml

#log file


# compile file
javac -classpath /usr/share/tomcat8/lib/servlet-api.jar -d classes src/Ch1Servlet.java

# error
problem:
touch: cannot touch ‘/software/tomcat-8.0.26/logs/catalina.out’: No such file or directory
solution:
- under /usr/share/tomcat8
sudo mkdir logs 


