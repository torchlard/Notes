# historic tools
## ant
defined init, compile, build, test, clean
`ant test` test whole thing
- no dependency management

## maven
raise concept of repository, easy manage hundreds of jar files
- not use 'target' in ant
too restricted in lifecycle, not encourage you to self-define task

## gradle
include task in ant, use all resource from maven
replace xml with groovy, much simplified


# keyword
## implementation
not pass library that depends on, only effective in current module

## api
pass dependent library, can use that relied module

## provided (compileOnly)
only work in compile time, not involve in packaging

## apk (runtimeOnly)
only in generated apk, not involve in compile 




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

sourceCompatibility: which version java source file treated as
targetCompatibility: min JVM version code should run on

### quiet run
./gradlew -q run

# run without progress bar
gradle run --console=plain


# Windows
1. download zip folder
2. unzip to C:\
3. set GRADLE_HOME to gradle\bin

# assemble
assembile: build artifact
build: assemble artifacts with additioanl checks

















