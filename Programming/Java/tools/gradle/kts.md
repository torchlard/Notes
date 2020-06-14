# syntax
groovy: allow both `'` and `"`
kotlin: must use `"`

```kotlin
// property assignment
applicationId "com.hfrosua.animation"
=> applicaitonId = "com.hfrosua.animation"

// funciton invocation
implementation "androidx.lifecycle:lifecycle-viewmodel:2.0.0"
=> implementation("androidx.lifecycle:lifecycle-viewmodel:2.0.0")

// imperative => declarative style
apply plugin: "com.android.application"
=>
plguins {
  id("com.android.application")
}
```

## conversion
```groovy
buildscript {
  repositories {
    google()
    jcenter()
  }
  dependencies {
    classpath "com.android.tools.build:gradle:3.2.1"
  }
}
allprojects {
  repositories {
    google()
  }
}
task clean(type: Delete){
  delete rootProject.buildDir
}
```
```kotlin
buildscript {
  repositories {
    google()
    jcenter()
  }
  dependencies {
    classpath("com.android.tools.build:gradle:3.2.1")
  }
}
allprojects {
  repositories {
    google()
  }
}
tasks.withType<Delete> {
  delete(buildDir)
}
```

# plugin
## all-open compiler
kotlin has class and members `final` by default
inconvenient to use frameworks and libraries such as Spring AOP require class to be `open`
`all-open` make class and member with special annotation open

```t
buildscript {
  dependencies {
    classpath "org.jetbrains.kotlin:kotlin-allopen:$kotlin_version"
  }
}
apply plugin: "kotlin-allopen"
```

plugin specifies with @Component,@Async,@Transactional,@Cacheable are open automatically

## no-arg compiler 
generates additional zero-argument constructor for classes with specific annotation
generated constructor can't be called directly from Java/Kotlin, cam call by reflection
allow JPA to instantiate data class

## kotlin-jpa compiler
plugin specifies @Entity and @Embeddable as markers that no-arg constructor should be generated for a class
















