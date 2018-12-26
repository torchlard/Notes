# intro
Java project A,B
A depends on B's class
if sth change in B, change B, recompile B, package as jar

## two solution
1. package B into A
2. distribute B, when others need A, tell others to import B

## maven
POM (project object model)
use config to manage project built, report, documentation

## structure
"pom.xml"

dependencies
  dependency
    groupId {package name}
    artifactId {project name}
    version {jar version}
    packaging
  dependency
  dependency
  dependency

## parameter
type: jar/war
optional: true/false -> not necessary
exclusions: solve common dependency problem
scope
runtime: use jar when test/run, not compile time. eg. JDBC driver

## repository
### local repo
maven will download all jar dependencies to certain local directory

### 3rd party repo (private server)
usually built for company internal use
all jar needed for project use from private repo

### central repo
mavenCentral
public repo that are mostly open source
public access

## command
- generate
mvn archetype:generate -DgroupId=com.mycompany.app -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false

## build lifecycle
1. default: project deployment
2. clean: project cleaning
3. site: creation of project site documentation

1. validate: project is correct, all info available
2. compile
3. test
4. package: package in jar
5. verify: check result of integration test, ensure quality criteria
6. install : install package into local repo
7. deploy: copy final package to remote repo for sharing

## project structure
pom.xml
src
  main
    java {source code}
    resources
  test
    java
    resources

## dependency allocation principle
1. shortest route first
2. if same route, dependency written in front higher rank














