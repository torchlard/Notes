# cannot resolve symbols in import library
update to latest library version in build.gradle(app)

# cannot use java 1.8 features
add to build.gradle(Module:app)
```groovy
compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
```

# Installation failed with message Invalid File
clean project, build APK













