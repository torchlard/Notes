# terms
GLSL ES: OpenGL ES Shading Language

# shader
## vertex shader
describe traits (position, color ...)
vertex = point in 2D/3D space

## fragment shader
per-fragment processing, eg. lighting
can think as kind of pixel


# processing
JS file 
> WebGL system: 
  - per-vertex operation
  - per-fragment operation
> render to color buffer
> display

# homogeneous coord
4D coord (x, y, z, w) = 3D coord (x/w, y/w, z/w)

if w=1.0 => 3D coord
if w -> 0, coord -> infinity


# syntax
gl.drawArrays(mode, first, count)

mode: gl.POINTS, LINES, LINE_LOOP, LINE_STRIP, TRIANGLES
first: which vertex to start from
count: num of vertices used 

# coordinate
line of sight = negative z-axis

# naming
<base fn name> <num of params> <param type>

vertexAttrib3f 
=> base method name: vertexAttrib
=> num of params: 3
=> param type: f = floating point, i = integer

# buffer object
memory area store multiple vertices to pass many vertices simultaneously

1. create buffer object
2. bind buffer object to attribute
3. write vertex data (coord) to buffer

`gl.drawArrays(gl.POINTS, 0, n)` writes n points

```js
let vertices = new Float32Array([
  0,0.5, 10,
  -0.5,-0.5, 20,
  0.5,-0.5, 30
])
let FSIZE = vertices.BYTES_PER_ELEMENT
gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, stride=FSIZE*3, offset=0)
gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE*3, FSIZE*2)

```
can interleave different kind of data into same buffer
extract appropriate data using stride and offset in bytes


```js
let vshader_src = `
  attribute vec4 a_Pos;
  attribute float a_PointSize;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  void main(){
    gl_Position = a_Pos;
    gl_PointSize = a_PointSize;
    v_Color = a_Color;
  }
`
let fshader_src = `
  precision mediump float;
  varying vec4 v_Color;
  void main(){
    gl_FragColor = v_Color;
}
```  
gl_FragColor: receive data from vertex shader


basic shape = primitives

# process
1. vertex shader invoked, first coord pass to attrib variable a_Position
  - communicate to geometric shape assembly stage
2. invoke vertex shader for 2nd coord
3. invoke 3rd time, pass 3rd coord, completed vertex shader processing
4. geometric shape assembly process
  - use vertices and information (TRIANGLES), decide how primitives assembled
5. rasterization, geometric shape assembled -> fragments
  - all fragments fed one by one to fragment shader
  - for each fragment, set color, write output to color buffer


