# CAS letency (Column Access Strobe)
delay time between READ command and mmoment data available

memory timing: related to latency

letency(ns) = (cas latency / ram speed) x 2000
eg. DDR4-1866, CAS letency=13 => true latency = 13.93 ns

## memory timing
eg. 15-16-17-32

15: CAS latency
16: row address to column address delay (TRCD)
17: row precharge time (TRP)
35: row active time (TRAS)

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

# SRAM
retains data while power supplied
feedback loop by 2 inverters, keep transistors charged
  - small chared
  - bitlines has large voltage
2 bitlines opposite charge

each column of cells composed of 2 bit lines, each connected to every other storage cell in column










