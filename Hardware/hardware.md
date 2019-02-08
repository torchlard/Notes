# Sound
ALSA

# UFS
use 2 lane, 2.1, bandwidth 1200MB/s
serial transfer, full duplex

# NVMe
kind of protocol
data-link use PCIe, now PCIe 3.0, use 4 lane
bandwidth 4000MB/s, 8GHz
based on NAND Flash
have 65535 queue, each queue 65536 command
can use MSI 2048 interrupt vector, reduce delay
ATA instruction set

# eMMC
parallel transfer
half duplex (read/write)
UCS instruction set, subset of SCSI

# Optane
| | DRAM | NAND Flash | PCM |
| Page size | 64B | 4KB | 64B |
| read latency | 20-50ns | ~25 mu s| ~50 ns|
| write latency | 25-50 ns | ~500 mu s| ~1 mu s|

use 3D XPoint technology

# U.2
4 lane, 4GB/s
mix SATA, SAS, compatible to SATA, SAS, SATA E

# M.2
NGFF, aim to replace mSATA/mini PCIe
special form of SATAe, support AHCI and NVMe
4 lanes, 4 GB/s

# SATAe
compatible with SATA
can use 2 PCIe lane

# PCI
## original
PCI local bus 
  Core Chipset Components
    PCI Host bus <--> PCI root bridge

host bridge to separate processor and PCI bus, interchange data
usually only 1 root bridge, each root bridge manage 1 local bus

processor
  | --- cache
  |
bridge/
memory controller -- DRAM             Audio  Motion video
  |                                      |        |
------------------------PCI local bus---------------------- 
  |     |     |                             |
 LAN  SCSI  PCI-to-PCI bridge             Graphics
              |
            ------PCI local bus #1----
                        |
                  other IO functions

1. all device statisfy PCI standard = PCI device
2. tree structure, each PCI bus can connect to multiple PCI bus

## next gen cpu

Core Chipset component
-----PCI host bus----
      |         |
    PCI RB   PCI RB(root bridge)
      |         |
     PCI       PCI
  segment 0  segment 1

there are 512 bus to allocate, each segment has local bus

## properties
1. parallel bus
same clock 32 bit transfer, now 64

2. PCI space separate from processor space

3. high extensibility
root bridge as root, link to 1 PCI bus

## PCIe
change to serial transmission, use differential transmission
duplex
point to point structure

        CPU
         |
   ---root complex--- --- memory
      |     |     |
  switch  PCIe    PCIe bridge to
    |    end point  PCI/PCI-X
----|------
|   |     |
end |   pcie end point
pt  end
    pt

PCIe 3.0,4.0 use 128b/130b encoding -> every 128bit use 130bit to transmit

PCIe card can insert into any PCIe socket, device will auto adjust speed













