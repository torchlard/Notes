# CAS letency (Column Access Strobe)
delay time between READ command and mmoment data available

memory timing: related to latency

letency(ns) = (cas latency / ram speed) x 2000
eg. DDR4-1866, CAS letency=13 => true latency = 13.93 ns

## memory timing
eg. 15-16-17-32

15: CAS latency
  - #cycles seding column address to memory and beginning of data in response
16: row address to column address delay (TRCD)
  - #clock cycles between opening row of memory and accessing columns
17: row precharge time (TRP)
  - min #clock cycle prechange comand <-> open next row
35: row active time (TRAS)
  - row active command <-> precharge command

# DRAM (dynamic random-access memory)
store each bit of data in memory cell consist of tiny capacitor and transistor
capacitor can either chaged (0) / discharged (1), represent 1 bit

electric charge on capacitors slowly leaks off
external memory refresh circuit periodically rewrites data in capacitor
VS SRAM no need to refresh data
- dram more complicated circuitry and timing requirement

only 1 transistor and capacitor VS 4-6 transistors in SRAM required per bit
=> cost much lower, higher density

## word line
long horizontal lines connecting each row
control transister to open/close itself
only need 1 line

## destructive read
when read charge in cell, charge leaked and bit no longer exist
has to write back

sense amplifier: detect changes in bit, 1 at end of bitline
row buffer: store bits
column decoder: output bit you want to get

read-then-write

## refresh
refresh row counter
refresh period T, N rows
T/N
use row address to select the row

## write
read-then-write

## fast-page mode
page = row

1. open a page
  - row addr select row
  - sense amplifier
  - latch into row buffer
2. read/write
  - can do many things
3. close the page
  - write data from row buffer to memory row

# overall memory structure
chip (proc, L1, L2, L3)
front-side bus
chip (memory controller)
- dram
- dram



# SRAM
retains data while power supplied
feedback loop by 2 inverters, keep transistors charged
  - small chared
  - bitlines has large voltage
2 bitlines opposite charge

each column of cells composed of 2 bit lines, each connected to every other storage cell in column










