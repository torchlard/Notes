# intro
method defining compression of audio and visual digital data
used for web steraming media, CD, voice (telephone, videophone), broadcast tv

# meaning
can mean:
- mp4 container (MPEG-4 part 14)
- iso base media file (MPEG-4 part 12)
- H.264 codec (MPEG-4 part 10)

# history
absorb many features of MPEG-1 and MPEG-2, adding new features 
  - VRML support 3D rendering, object-oriented composite files
  - externally specified DRM
  - various types of interactivity

evolving standard divided into many parts
key part
  - part 2: for codecs DivX, Xvid, 2ivx
  - part 10: AAC, x264 encoder, HD video
most features left to developers decide whether or not to implement => profiles/levels  

bit-rate: few kbps - tens Mbps

## profiles and levels
1. sync and multiplexing of video and audio
2. compression format for visual data
3. compression format for perceptual coding of audio signals (AAC), audio/speech coding
8. method to carry mpeg4 content on IP network, design RTP payload, SDP transport, MIME
10. AVC compression format for video signal
11. for rich, interactive content with multiple profiles (2D, 3D)
12. ISO based time-based media format (3GP, JPEG 2000)
13. intellectual property management and protection
14. mp4 file format
15. carriage of network abstraction layer
16. animation framework eXtension
17. streaming text format
18. font compression and streaming
21. mpeg-J graphics framework extension
22. open font format
23. symbolic music representation
24. audio and system interaction
25. 3D graphics compression model
29. web vieo coding
30. timed text and other visual overlays in ISO based file  
31. video coding for browsers
33. internet video coding

# streaming text format
flexible framing structure: Timed Text Units
```
(3GPP domain)
[text sample and sample description, text modifiers
  - font, positioning, background colour of text box]
        |
(MPEG domain)
[3GPP text access units]
        |
[Timed text units(TTU)] <--> re-partitioning
        |
[Transport System]
```
text access unit small (100 - 200B), << packet size carrying text data
requires aggregation and fragmentation

adapt to various transport layers, eg. RTP over IP and MPEG-2
for each transport layer, choose most suitbale TTU structrue

# synthetic audio coding
AAC: multi-channel perceptual audio coder

1. high resolution transform => redundancy removal
2. continuously signal-adaptive model of human auditory system
  - determine threshold perception of quantization noise => irrelevancy reduction
3. entropy coding match actual entropy of quantized values 
4. tools for joint coding of stereo signals 

## audio object types
include system for handling diverse group of audio formats in uniform manner
each format assigned unique audio object type to represent it















