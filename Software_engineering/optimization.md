# optimization process
1. clarify optimization target
  - may lose mind
2. set standard optimize to what extend
  - eg. 50% higher than expectation
3. find bottleneck
  - procedural optimization better than language level optimize
4. go optimize
  - don't 
    - excessive optimize single machine, consider as whole
    - excessive optimize in one dimension
  - should
    - space trade performance (eg. multi node)
    - distance trade performance (eg. save data at client side)

# solution
optimization order: application > component > system

## application level 
1. cache
2. async
3. multi-threading, distributed
4. delayed calculation
5. batch processing

## component level
1. db optimize
2. GC

## system level
1. CPU
2. threading
3. network
4. disk
5. memory











