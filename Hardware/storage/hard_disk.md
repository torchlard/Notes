# SAS (Serial Attached SCSI)
point-to-point serial protocol move data to and from computer-storage
replace older parallel SCSI

SAS-4: 22.5 Gb/s

# basic component
## initiator
device originates device-service and task-management requests for processing by target device
receives response for same request from other target devices

## target
device containing logcal units and target ports that receives 
- device service
- task management requests for process
 
send response for same requests to initiator devices
target: hard disk / disk array system

## service delivery subsystem
part of IO system transmit info between initiator and target

## expanders
device form part of service delivery subsystem
facilitate communication between SAS devices


# NVME over fabrics
allow using nvme protocol over network

## RDMA (remote direct memory access)
little / no CPU concern














