# intelliJ idea ide cannot run code
1. right click folder containing source code, make it as test root
2. edit configure -> choose class file
3. run

#
Array<T> is mutable, but List<T> is immutable

val a = arrayOf(1,2,3)
a[0]=a[1]  //ok

val l = listOf(1,2,3)
l[0]-l[1]  //fail

val m = mutableListOf(1,2,3)
m[0]=m[1]  //ok

# break main
in main, you can exit funciton anywhere by adding return
