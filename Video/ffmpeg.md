# intro
very fast video and audio converter
input: regular files, pipes, network streams, grabbing devices
output: arbitrary number of output files

input/output url: can contain any num of streams of different types 
  - video/audio/subtitle/attachment/data
  - allowed number and types limited by container format

## stream
2:3 = 4th stream in 3rd input file

## process
input file 
  --demuxer--> encoded data packets
  --decoder--> decoded frames 
  --encoder--> encoded data packets
  --muxer--> output file

cal libavformat library 


## example
`ffmpeg -i input.avi -b:v 64k -bufsize 64k output.avi`
set video bitrate of ouitput file to 64 kbit/s

`ffmpeg -r 1 -i input.avi -r 24 output.avi`
force frame rate of input file (raw format only) to 1 fps, output file to 24 fps

`ffmpeg -i A.avi -i B.mp4 out1.mkv out2.wav -map 1:a -c:a copy out3.mov`
3 output files, first 2 no -map set, so auto select streams

out2.wav only accepts audio stream, so only audio stream from B.mp4 selected
out3.mov (-map 1:a) select all audio stream from B.mp4


## filtering
before encoding, ffmpeg can process raw audio and video frames using filters from libavfilter lib

## stream copy
omit decoding and encoding step for specified stream, does only demuxer and muxer

## stream selection
-map: manual control of stream selection in each output file
-vn/-an/-sn/-dn: skip video/audio/subtitle/data streams

### auto select
video: highest resolution
audio: most channels
subtitle: first subtitle stream found
  - subtitle encoder can be either text-based/image-based

if several streams of same type rate equally, choose lowest index

## stream handling
set via `-codec` option 
exception exists for subtitles
not validate if specified encoder can convert selected stream 
  OR converted stream acceptable within output format

`-threads:1 4` 4 threads for second stream 
### stream type
v: video
a: audio
s: subtitle
d: data
t: attachment

`m:key[:value]` match streams with metadata tag key having specified value
u: matches streams with usable coinfiguration

### SI unit
K,M,G: power of 1000
Ki,Mi,Gi: powers of 1024


























