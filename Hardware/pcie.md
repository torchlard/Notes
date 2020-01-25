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
