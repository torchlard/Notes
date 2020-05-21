# NoClassDefFoundError
classpresent during compile time but not in runtime

## gradle
gradle build
gradle run

#executable file
can get executable file and all libs from build/distribution/Java.zip

#quiet mode
gradle -q build; gradle -q run

# compile order
need to compile other java file first if depends on them (import)



##
```java
numbers.forEach(x -> System.out.println(x));
// to
numbers.forEach(System.out::println);
```

# switch java version
sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/java_11_openjdk_amd64/bin/java" 1
sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/java_11_openjdk_amd64/bin/javac" 1
sudo update-alternatives --config java
sudo update-alternatives --config javac

# file format

## JAR (Java Archive)
zip format file
collection of Java class file, metadata, resources (text, image)
for distributing java software / library

## WAR (Web application archive)
jar fiel for distributing JSP, java servlet, java class, xml, tag lib, html






















