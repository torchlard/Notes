# could not resolve package
solution: flutter pub get

# waiting for flutter emulator to connect
avdmanager create avd -k "system-images;android-29;default;x86_64" -n temp

# Unable to locate a development device; please run 'flutter doctor' for information about installing additional components.
flutter config --android-sdk $ANDROID_HOME

# Execution failed for task ':app:desugarDebugFileDependencies'.















