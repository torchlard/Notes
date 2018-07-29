
# compile file
javac -classpath /usr/share/tomcat8/lib/servlet-api.jar -d classes src/Ch1Servlet.java

# error
problem:
touch: cannot touch ‘/software/tomcat-8.0.26/logs/catalina.out’: No such file or directory
solution:
- under /usr/share/tomcat8
sudo mkdir logs 


