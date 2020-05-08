# Jib
open source Java containerizer from Google
not require you to write Dockerfile / have docker installed
directly integrated into maven / gradle, just add plugin

adv
1. simple
2. fast: take advantage of image layering and registry caching 
  - read build config, organize application into distinct layers
  - only rebuild and pushes layers that have changed
3. reproducible: support building container image declaratively from metadata

## command
```gradle
plugins {
  id 'com.google.cloud.tools.jib' version '0.9.0'
}
jib.to.image = 'gcr.io/my-project/image-built-with-jib'
```
gradle jib
gradle jibDockerBuild










