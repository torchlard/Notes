# RTL coding
think about functionality of design rather than its implementation
allow synthesis tool to optimize functionality, implement design 

this style of coding = TRL coding

# SSD hardware
## NAND
electrons stored in floating gate
charged=0, not-charged=1

NAND flash organized in grid, entire grid layout = block
page = row in grid

common page size: 2k, 4k, 8k, 16k
128-256 pages per block
block size = 256kB - 4 MB

|                   | SLC  | MLC  | TLC  | HDD       | RAM      |
|-------------------|------|------|------|-----------|----------|
| PE                | 100k | 10k  | 5k   | -         | -        |
| bits per cell     | 1    | 2    | 3    | -         | -        |
| seek latency(μs)  | -    | -    | -    | 9000      | -        |
| read layency(μs)  | 25   | 50   | 100  | 2000-7000 | 0.04-0.1 |
| write latency(μs) | 250  | 500  | 1500 | 2000-7000 | 0.04-01  |
| erase latency(μs) | 1500 | 3000 | 5000 | -         | -        |

with TLC, cell can have more values, need more time to know

read data at page level
write at page level if cell empty
erase data at block level

erasing NAND flash need high amount of voltage
update existing page
1. copy content of entire block to memory
2. erase block
3. write content of old block + updated page

if dirve is full, no empty pages available
1. scan blocks marked for deletion, not yet deleted
2. erase them
3. write data to now-erase page

SSD become slower as they age
- mostly-empty drive full of block written immediately

garbage collection: background process mitigate performance impact ofprogram/erase cycle

## TRIM command
allow OS tell SSD it can skip rewriting certain data next tiime it performs block erase
- increase SSD longevity

write amplification: data written to drive > actual update
- eg. update 4MB for 4KB file update
- keep significant chunk of drive free reduce write amplification

Wear leveling: ensure NAND blocks written and erased like others
- may increase write amplification

## controller
```
  Host
  |
Host I/F
  FTL  <----> MEM
NAND_CTL
  |
Flash
```
FTL: flash translation layer, do wear levelling

lane between host with controller
- RTL -> PROC

memory inside controller moving to DDR
- much higher latency, limited bandwidth

basic trend: high performance, low energy consumption
reducing cycles between host 

### theory
has DDR3/DDR4 memory pool manage NAND itself

NAND flash connected to controller through series of parallel memory channels
~ load-balancing work as high-end storage array

trend: faster data standard, more bandwidth, more channels per controller


# Optane
use 3D XPoint technology






