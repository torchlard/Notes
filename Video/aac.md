# intro
48 full-bandwidth (up to 96 kHz) audio channels in 1 stream + 16 low freq (<=120 Hz) efects
16 coupling / dialog channels
16 data streams

## transparency
hifi/stereo: 128 kbps
5.1 audio: 320 kbps

use purely MDCT algorithm => higher compression efficiency

# psychoacoustics
hearing not purely mechanical phenomenon of wave propagation, also sensory and perceptual event
within ear transformed into neural action potentials

outer hair cells enhance sensitivity and better frequency resolution


# encoder
1. signal convert from time-domain to frequency-domain using MDCT, using filter banks
2. signal quantized based on psychoacoustic model and encoded
3. internal error correction codes added
4. signal stored / transmitted

encoders can switch dynamically between single MDCT 1024 points / 8 blocks of 128 points


















