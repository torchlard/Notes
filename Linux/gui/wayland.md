# history
past: all talk to xserver
future: put DRI, DRM in middle, with window system like X and wayland off in corener
=> much simplified graphics system, more flexibility and better performance

a lot of infrastructure move from x server into 
- kernel: memory management, command scheduling, mode setting
- library: cairo, pixman, freetype, fontconfig, pango ...

x server has many functionality must support to claim speak to X protocol
- eg. code table, glyph rasterization, caching, XLFDs
- entire core rendering API: to draw strippled lines, polygons, wide arcs ...

keep x server modern by adding extensions
- eg. xrandr, xrender, composite
=> wayland can move xserver and legacy tech to optional code path

# architecture
wayland = protocol + reference implementation Weston
develop version of GTK and Qt that render to wayland instead of X

application expected to gain support for wayland through lib without modification

## network transparency
ability of protocol to transmit data over network in manner of invisible to apps

remote access to wayland apps by 
- pixel scraping: vnc
- rendering command stream: rdp, spice, x11
new attempt: waypipe

## protocol
follow client-server model, client request display of pixel buffers on screen
server(compositor): service provider controlling display of buffers

low-level layer / wire protocol: handle inter-process communication between client and compositor
  - marshalling data they interchange
  - message based, implement using kernel IPC (eg. socket)
  - mainly written in C
  
high-level layer: handle info that client and compositor need to exchange
  - to implement basic features of window system
  - implemented as async object-oriented protocol
  - auto generated from description in XML format

reference implementation: libwayland-client, libwayland-server

## overview
service offered by compositor presented as series of objects living on same compositor
each object implement interface with name, number of methods (reqeusts), several associated events

async: request don't wait for synchronized replices / ACK
client can make request on some object if object's interface support that request
compositor return information back, cause object to emit events with arguments

event response to certain requet, internal event (eg. from input device), state chagne

global object: advertised by compositor to client
non-global object: created by other objects that already exist as part of their functionality

optionally composier can define and implement own interface, support new requests and events 
  - each interface contains 'version number' attribute to distinguish interfaces

## core interface
wl_display: encapsulate wayland protocol itself
wl_registry: register all global objects that want to be available to client
wl_compositor: object represent compositor, combine different surfaces into 1 object
wl_surface: rectangular area on screen, define by location, size, pixel content
wl_buffer: object provide displayable content when attach to wl_surface
wl_object: displayable area of screen
wl_pointer, wl_keyboard, wl_touch: differnet input devices like pointers, keyboards

## flow
1. open connection to compositor using wl_display object
2. client request wl_registry from compositor, bind those client intereested in
3. client bind at least wl_compositor or more wl_surface

## extension protocol to core protocol
### XDG-shell
manage surfaces under wayland compositor
traditional way to manipulate(maximize,minimize,fullscreen ...) surface use wl_shel_*()

xdg-shell-client-protocol.h header 
aim to substitute wl_shell in long term, not be part of wayland core protocol
implement desktop-style window

### IVI-shell
targeting in-vehicle infotainment device

## rendering model
not include rendering api, use direct rendering model
client must render window content to buffer shareable with compositor
client can do rendering
  - all by itself
  - use rendering library (Cairo, OpenGL)
  - rendering engine of high-level widget library (Qt, GTK)
  - optionally use specialized library (eg. freetype for font rendering)

resulting bufer stored in wl_buffer, internal type of object implementation dependent
only require content data shreable between client and compositor

if use cpu software renderer, result stored in system memory
client and compositor use shared memory to implement buffer communication without extra copy
shared memory buffer: wl_shm, wl_shm_pool

for gpu rendering, client and compositor share gpu space buffer using special handler to ref
avoid additional copies of data to GPU

1. when rendering completed in shared buffer, client instruct compositor to present rendered content of buffer 
2. client bind buffer object to surface object
3. transfer effective control of buffer to compositor
4. client wait compositor to release buffer (signaled by event) if want reuse buffer to render another frame

# wayland VS X
## architecture
X: composition manager is additional feature 
wayland: merge display server and compositor, incorporate some task of window manager

## compositing
X: optional, active, compositor fetch all pixel data => latency
wayland: mandatory, passive, compositor recieve pixel data directly from clients

## rendering
X: x server can perform rendering, although it can display rendered window sent by client
wayland: not expose any rendering api, delegates to clients such tasks (font render, widgets ...)
  - window decoration can render on lcient side (graphics toolkit) / server side (compositor)

## security
X: lack security, some extension mitigate it
wayland: isolate input and output of every window => confidentiality,integrity,availability
  - less code need run with root priviilege

## IPC
X: provide basic communication methods between X clients, later extended by ICCCM convention
  - used by window amanger
  - implement X session, selection, drag-and-drop, ...
wayland: not support communication between wayland clients
  - if need, should implement by desktop environment / 3rd party

## networking
X: architecture designed run over network
wayland: not offer network transparency by itself, can use remote desktop protocol  
  
# compatibility to X
xwayland: x server running as wayland client
capable of displaying native X11 client application in wayland compositor environment
~ XQuartz run X applications in macOS

# libinput
weston code for handling input device split into own library (libinput)
provide common implementation for multiple compositor
device detection (via udev), input device event processing and abstraction

# EGL
the only GL binding api that avoid dependencies on existing window system
eg. GLX pull in X dependencies, can't link to full GL
so use OpenGL ES to render


# current available
compositor: Weston, Sway, kde kwin
display manager: GDM (wayland, gnome), LightDM(x11, cross desktop), Ly(console), SDDM(x11/wayland, QML)
desktop environment: gnome, kde
buffer api: GBM, EGL streams
gui library: gtk3, qt5, clutter, SDL2, GLFW, GLEW, EFL, winit
  

# direct rendering infrastructure(DRI)
framework for allowing direct access to graphics hardware under X window
provide hardware acceleration for MEsa implementation of OpenGL
implementation scatter in X server and associatged client library

## DRI 1
in past memory size of video card very small
single instance of screen front buffer and back buffer shared by all DRI client and X server
now completely obsolete

to render back buffer, DRI process ensure rendering clipped to area reserved for window
1. access to DRM device exclusive => DRI client lock at beginning of rendering => blocked
2. operation not retain memory allocation after release lock => any data uploaded to graphics memory (eg. texture) lost

## DRI 2
since increasing popularity of compositing window manager like Compiz 
=> X client support redirect to 'offscreen pixmaps' while direct rendering

every DRI client get own private back buffer

## DRI 3
client allocate render buffer instead of rely on X server
get rid of insecure GEM buffer sharing mechanism


# direct rendering manager (DRM)



# waypipe
transparent proxy application for wayland protocol

waypipe client: pretend to be remote applicaiton
waypipe server: pretend to be wayland compositor, offer unix socket over which applicaitons can connect
  - when connect, create new connection handling process
  - convert wayland protocol message and file descriptor updates -> single data stream
  - communication channel via ssh

majority of file descriptor update are changes to shared memory buffer
waypipe maintains private copy of each shared memory region
ony send data which has changed since last time private copy sync with shared memory region

## highlight
waypipe support many quality of life feature, eg. command line wrapper for ssh
hardware accelerated video encoding
reconnect app when ssh connectionbreaks

challenge: buffer management logic, way interact with multi-threading and reconnection support






