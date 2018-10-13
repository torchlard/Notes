## Expires
http response: add Expires field
if time exceed expires, request from server again

## Cache-control
refine expire to second level
`Cache-Control: max-age=30`

## Last-Modified
indicate when data changed, so will know when to expire

## If-Modified-Since
after exceeding expire date, browser send request to ask server 
whether that data is modified since certain date
  - if modified: then receive new file
  - else: ignore

## Etag
maybe file edited but content not changed -> last modification time still change
Etag: ~hash value of file content

browser --> Server (If-None-Match=xxx)
Server --> browser (Etag=xxx, 304 if not modified)

## Cache-Control
don't want any cache storage => Cache-Control: no-store

## first page strategy
want to refresh immediately when first page changed, but use cache when not changed
`Cache-Control: max-age=0`
  same as
`Cache-Control: no-cache` (each time send request to get newest)

## update without sending request
set max-age=31536000 (1 year)
when script not changed, read from cache
when script changed, change filename of script import in html,
  force browser to request download new one






