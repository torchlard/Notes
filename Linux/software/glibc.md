# motivation
C lang not provide built-in facility for IO, memory ..., but defined in standard library
glic implement ISO C standard, and additonal features in POSIX

# intro
include several header files, eg. stdio.h, string.h

## reserved name
all external identifiers (global functions, variables) that begin with `_`
all identifier begin with `__`, `_<a Capital letter>`

dirent.h: d_
fcntl.h: l_, F_, O_, S_
...

# relation with libc
## libc
ANSI C lib
- most basic C function lib
ctype.h: convert alphabet, test chars
errno.h
float.h
math.h
stddef.h: common function definition
stdio.h
stdlib.h
string.h
time.h
stdarg.h
signal.h
setjmp.h
locale.h
assert.h

## glibc
GNU C lib

## glib
GTK+ basic lib


# dir in linux
/usr/include/*.h : header files
/usr/lib/*.o,*.a  : for linkage (static)
/usr/lib32/gconv  : encoding
/usr/share/locale
/usr/share/i18n/
/usr/share/zoninfo  : timezone

# directory
string
signal
dlfcn: manage shared library dynamic loading
direct: file directory operation
elf: shared lib dynamic loading (interpreter)
iconv: conversion among different encoding
inet: socket implementation
intl: gettext implementation, internationalization
io
linuxthreads
locale: localization
login: manage virtual terminal device, system security access control
malloc: dynamic memory allocation and management
nis
stdlib: other basic functions

# content
## sshared function lib
in /lib, /usr/lib















