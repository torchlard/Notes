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
