# Transfer mechanism
## persistent
in HTTP/1.1, all connections default persistent connection

## pipelining
make pipelining possible, no need wait next request
even faster than persistent connection

## Range Request
requet for certain byte range data

## zip format
gzip, compress
deflate, identity

# MIME
mechanism to manage different file type
use multipart to contain data
eg. multipart/form-data, multipart/byteranges, 
  
# recoverable mechanism
if download interrupt in middle, need some way to resume

# Content Negotiation
decide to show eng/chi version page
things to consider:
accept, accept-charset, accept-encoding, accept-language, content-language








