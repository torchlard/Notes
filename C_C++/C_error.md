# warning: implicit declaration of function ‘sleep’[-Wimplicit-function-declaration]
reason: sleep is not part of C language, compiler needs a declaration/prototype of it so that to know about num of args and data type, return type of function
=> if not, declare Implicit Declaration

solution:
`#include <unistd.h>`

# ./test: error while loading shared libraries: libmystack.so: cannot open shared object file: No such file or directory
reason: cannot find .so location
solution
1. export LD_LIBRARY_PATH=.
2. gcc -g -o test test.c -lmystack -L. -Wl,-rpath=.
// -Wl: -rpath option is to linker
// write search location to test file


