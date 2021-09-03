# credit usage
count credit every 60 seconds 
how long warehouse run continuously

# data loading
if bulk load files concurrently, smaller warehouse generally sufficient

# query processing
performance scales linearly with warehouse size

auto-suspend option: inactive for specified period of time
auto-resume: when statement submitted and current warehouse for the session

## concurrency
number of query run determined by size and complexity of each query
multi-cluster warehouse can fully automate scaling for concurrency

# usage in session
when session initiated, by default not have warehouse associated

support default warehouse for each individual user / driver











