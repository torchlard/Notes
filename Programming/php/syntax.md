# type
integer, float, string, boolean, arrays, objects, resources, NULL

# variable scope
global: access outside function
local: inside function
static: will not delete after function is executed, can reuse

# predefined variables (superglobals)
$GLOBALS
$_SERVER

# constants
```php
__LINE__
__DIR__
__FUNCTION__
__CLASS__
```

# array
indexed arrays: with numberic index
associative arrays: with named keys
multidimensional arrays: array contain > 1 arrays

# function
```php
$arr3 = array_filter($arr, fn($var) => $var%2 == 0);

```

# operator
==: same value
===: same type

.
.=

if expr1 exists and is not NULL, use expr1; else expr2
`$x = expr1 ?? expr2` 
`$x = expr1 ? expr2 : expr3`


# class
public: access everywhere, default
protected: access within class and class derived from that class
private: only access within class

static method
static properties

# namespace
allow same name to be used for >1 class




