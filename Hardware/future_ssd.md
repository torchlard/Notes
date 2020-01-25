# nvram
non-volatile random access memory = nvram


# phase change memory (PCM)
proposed as replacement for NAND
rapidly heating chalcogenide glass, shifting between its crystalline and amorphous state
- crystalline: as 0, very high resistance
- amporphous: as 1, low resistence

intermediate state feasible => allow 2 bits stored per cell

read time: 100-300 ns
program time: 10-150 μs
much lower latency than NAND

cell can be reprogrammed at least 10^6 times

# system architecture using vram
1. replace disk
2. shared address space
3. entirely nvram

## virtaul memory
1. don't need page exchange
2. page size can adjust, less small segment storage
3. unify page protection and filesystem protection
4. unify address space and fs naming space

## operation
no need booting, mostly kernel restart
power down won't remove running states of system
to save power, can stop CPU, but IO and nvram still DMA transfer

## application 
1. state = {install, run}
2. security problem 

## industry impact
1. embedded system
2. mobile devic

# magnetic RAM


# programming issue
hard to recover after crash => crash consistency
transaction + record log













