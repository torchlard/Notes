# java.lang.NoClassDefFoundError: io/netty/channel/EventLoopGroup

# cache error
1. stop gradle daemon
gradle --stop
2. delete cache
rm -rf ~/.gradle/caches/
3. start gradle daemon
gradle --daemon


# org.gradle.api.UncheckedIOException: Could not add entry


# Could not run build action using Gradle distribution 'https://services.gradle.org/distributions/gradle-4.1-all.zip'.


# Could not find method bootJar() for arguments


# Failed to ping owner of lock for file hash cache
reason: currently used by another gradle instance 
solution: `find ~/.gradle -type f -name "*.lock" -delete`



