# start new project
gradle init

### compileJava
compile all java files under 'src/main/java'
### compileTestJava
source files under 'src/test/java'
### test
run unit test from 'src/test/java'
### jar
package 'main' compiled class and resource from 'src/main/resources' into single 
```<project>-<version>.jar```
### javadoc
generate Javadoc for main classes


## theory
source files and resources logically group by type
  has own set of file dependencies, classpath ...
file form a source set can be different directory
most language plugins, auto create source set called 'main'-> for production code


### Source set
source file, location
compilation classpath, dep
where compiled class placed

### repository
eg. mavenCentral(), jcenter()
where to look for modules
### Configuration
eg. implementation
named collection of dependencies, grouped together for specific goal
### module coordinate
eg. org.hibernate:hibernate-core:3.6.7.Final
ID of dependency: ```<gorup>:<module>:<version>```

### api 
dependencies requried for compiling both modules and any modules depend on it

### sourceCompatibility
which version java source file treated as
### targetCompatibility
min JVM version code should run on

### quiet run
./gradlew -q run






