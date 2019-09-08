# cgi principle
protocol on basis on HTTP

## process
1. reqeust http://example.com/cgi-bin/hellowrold.cgi
2. before call `helloworld.cgi`, get all HTTP request info and environment variable
3. also get stdin, eg. post data get from stdin
4. return HTTP header+body

## problem
1. each time request CGI, create new process to handle
  - unix style fork-and-execute, heavy load
2. NO url routing, expose true path

# detail
meta-variable














