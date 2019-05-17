# RetentionPolicy
RetentionPolicy.SOURCE:
- only keep in source file, when Java compile to .class, will erase annotation
- eg. @Override, @SuppressWarnings
- only for checking

RetentionPolicy.CLASS:
- annotation keep in .class, when jvm load .class then erase annotation
- preprocessing, auto generate some code 
- eg. ButterKnife

RetentionPolicy.RUNTIME
- annotation keep anyway
- need runtime to get msg














