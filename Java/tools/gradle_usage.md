# project, task
every gradle build made up of >= 1 projects
every project has >= 1 tasks

task = atomic piece of work which a build performs
compile classes, create JAR, generate Javadoc, public archives to repository

## dynamic task
```groovy
4.times { counter ->
  task "task$counter" {
    doLast {
      println "I'm task number $counter"
    }
  }
}
```

shortcut
```
hello.doLast {
  println "xxx"
}
```

## task properties
add property `myProperty`
```groovy
task mytask {
  ext.myProperty = "myValue"
}

task printprop {
  doLast {
    println mytask.myProperty
  }
}
```

default task: execute if no task specified

## external dependency
buildscript {
  repositories {
    mavenCentral()
  }
  dependencies {
    classpath 'xxx'
  }
}

# task type
simple task: define with action closure
enhanced task: behavior built into task, task provide properties use to confgure behaviour
  - most gradle plugins use enhanced tasks
  - declare task and config task using its properties
can implement custom task class in any lang that compile to JVM

## package task class
Build script: auto compiled and include in classpath, not visibe outside build script
buildSrc: visible to every build script, not visible outside script
  - position: rootDir/buildSrc/src/main/{lang}
standalone project

```groovy
class GreetingTask extends DefaultTask {
  @Input
  String greeting = 'hello from default'

  @TakAction
  def greet {
    println greeting
  }
}

task helo(type: GreetingTask)
task greet(type: GreetingTask){
  greeting = 'greet ffrom task'
}
```
# init build env
buildSrc/src/main/{groovy|java}/...

# plugin
reusable piece of logic across different projects and builds
```groovy
class GreetingPlugin implements Plugin<Project> {
  void apply(Project project){
    project.task('hello'){
      doLast {
        println 'hello from greeting plugin'
      }
    }
  }
}

apply plugin: GreetingPlugin
```

make plugin configurable
```groovy
class GreetingPluginExtension {
  String message = 'hello frm'
}

def extension = project.extensions.create('greeting', GreetingPluginExtension)

// configure extension
greeting.message = 'hi form gradle'
```












