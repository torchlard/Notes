# buffer vs View
pointer to cetain object in memory storage ~ malloc
implement Buffer as ArrayBuffer..

use View to determine how to view those binary data
  eg. as float32/unsigned integer/...

### Typed Array
only stored reference of buffer

TypedArray: fixed type (eg. Uint8Array, Float64Array)
DataView: unlimited type

Int8Array <--> int8_t [1]
Uint8Array <--> uint8_t [1]
Uint8ClampedArray <--> uint8_t [1]
Int16Array <--> int16_t [2]
Uint16Array <--> uint16_t [2]
Int32Array <--> int32_t [4]
Uint32Array <--> uint32_t [4]
Float32Array <--> float [4]
Float64Array <--> double [8]

similar to `void *ptr` in C

## overflow
```js
Uint8Array.of(0xff, 0x101, -2) === Uint8Array[255,1, 254]
Uint16Array.of(0xff, 0x101) === Uint16Array[255,257]
```
because max 255, 0x101(257) is overflow, so result=1

Uint8Array: when overflow, from 0 restart; underflow, from 255--
Uint8ClampedArray: when overflow, keep 255; underflow, keep 0

## Composite data structure
```js
const buffer = new ArrayBuffer(12)
const idView = new Uint32Array(buffer, 0, 1)
const deptView = new Uint8Array(buffer, 4, 4)
const salaryView = new Float32Array(buffer, 8)
```
similar to 
```c
struct employee {
  unsigned int id;
  unsigned char department[4];
  float salary;
};
```

# DataView
will not
- buffer overflow: if exceed boundary, then overwrite next byte
- security problem

## endian
Little-endian: start from least significant byte
Big-endian: start from most significant byte

TypedArray use system's default endianness
use BOM (byte order mark) to determine data belong to which endianness

## NodeJS Buffer
Buffer class inherit from Uint8Array

## Blob
Blob = immutable raw binary sequence
- attribute: (size, type), method: slice

[file api, fetch api, XHR]: request/response's body --> Blob
`URL.createObjectURL`: create Blob url
`URL.revokeObjectUrl`: remove url pointer






