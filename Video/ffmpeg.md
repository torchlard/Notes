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

# filter
convert 1 video frame per call to avcodec_decode_video2
input expected to be "one image" worth of bitstream data

for raw h264 (.h264/.bin/.264), individual nal unit data concatenated in seq of nal units
with start code in between (00 00 01 XX)
h264 frame parser simply cut file at start code markers, search 

"00 00 01" start code redundant if muxing format already has length markers in it
put PPS/SPS in file header
h264_mp4toannexb adapt to new format => identify pps/sps in extracted parts of file headers

parser: take seq of input data, split in frames without discard any data (only change packet boundaries)
bitstream filter: can change data 

# options
## Main options
-f <fmt>
-y(-n): (not) overwrite output files
`-c[:stream_specifier] codec (input/output,per-stream)`
  - select encoder or decoder for one or more streams

`ffmpeg -i INPUT -map 0 -c:v libx264 -c:a copy OUTPUT`
  - encode all video stream with libx264, copy all audio streams
`ffmpeg -i INPUT -map 0 -c copy -c:v:1 libx264 -c:a:137 libvorbis OUTPUT`
  - copy all streams except seond video, which will encode with libx264
  - 138th audio will encode with libvorbis

-t: duration
-to: stop writing output or reading input at position (time duration spec)
-ss: seek in input file to position
-timestamp <date>: set recording timestamp in container

`ffmpeg -i in.avi -metadata title="my title" out.flv`

`ffmpeg -i in.mkv -c copy -disposition:a:1 default out.mkv`
  - make second audio stream the default stream
`ffmpeg -i in.mkv -c copy -disposition:s:0 0 -disposition:s:1 default out.mkv`
  - make second subtitle stream the default stream, remove default disposition from first subtitle stream

-program [title=title:] st=stream[:st=stream...]
  - create program with specified title, program number and add specified streams to it

-target: target file type (vcd,svcd,dvd,dv,dv50)
-dn: blocks all data streams of file from being filtered / auto selected / mapped for any output
-frames <framecount>L stop writing to stream after n frames
-qscale: use fixed quality scale (codec-dependent)
-filter: create filtergraph and use to filter stream
-progress
-attach <filename>: support by few formats like Matroska

## video options
-vframes: number of video frames to output
-r <fps>: frame rate 
-s: set frame size
-pass: two-pass video encoding
  - first pass into log file, 2nd pass log file used to generate video at exact bitrate

## advanced video option
-pix_fmt  
-rc_override: rate control override for specific intervals  
-ilme: force interlacing support in encoder
  + interlacing
    - technique for doubling perceived frame rate without consuming extra bandwidth
    - reduces flicker by phi phenomenon (2 nearby optical stimuli presented in alternation with high frequency)
    - given bandwidth and high refresh rate, interlaced video can provide higher spatial resolution than progressive scan
-dc: intra_dc_precision
-vtag: force video tag/fourcc
-force_key_frames
  + key_frame
    + location on timeline marks beginning or end of a transition
-init_hw_device, -hwaccel
  - cuda, dxva2 (direct3D), vaapi, vdpau, opencl, qsv(intel quicksync)

## audio option
-ac: set number of audio channels
-an: input option blocks all audio streams of a file from being filtered / being auto selected / mapped for any output

## advanced subtitle options
-fix_sub_duration: for each subtitle, wait for next packet in same stream, adjust duration of first avoid overlap
-canvas_size: set canvas size to render subtitle

## advanced options
-map: designate one or more input streams as source for output file
  - first|second `-map` optioon specifies source for output stream 0|1
  - `-` negative mapping
  - trailing `?` after stream index set optional map 

-map_channel [input_file_id.stream_specifier.channel_id|-1]  
  - -1: map muted channel
`ffmpeg -i INPUT -map_channel 0.0.1 -map_channel 0.0.0 OUTPUT`
assume INPUT is stereo audio file, switch 2 audio channels

`ffmpeg -i INPUT -map_channel -1 -map_channel 0.0.1 OUTPUT`
mute first channel, keep second 

`ffmpeg -i stereo.wav -map 0:0 -map 0:0 -map_channel 0.0.0:0.0 -map_channel -0.0.1:0.1 -y out.ogg`
split channels of stereo input into 2 separate streams
each output stream can only contains channels from single input stream

-map_metadata
  - g: global metadata, s: per-stream metadata, c: per-chapter metadata, p: per-program metadata

-map_chapters
-re: read input at native frame rate
-vsync: video sync method
-async: audio sync metho

-discard: discard specific streams / frames from streams
-max_muxing_)queue_size: when transcoding audio and video streams, 
  - ffmpeg not begin writing into output until it has 1 packet foreach stream
  - while waiting, packets for other streams are buffered

## preset files
contains seq of option=value pairs, one for each line, specifying seq of options 
1. search arg.ffpreset in dir $FFMPEG_DATADIR and $HOME/.ffmpeg


# hardware acceleration
platforms offer access to dedicated hardware to perform video-related tasks
using hardwares allow some op like decode, encode, filtering completed faster / use less resources
  - may give different / inferior results
  - impose additional restrictions not present in software only solution













