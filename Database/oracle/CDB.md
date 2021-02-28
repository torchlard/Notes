# CDB (multitenant container database)
within CDB each container has unique ID and name

contain: 0,1,many customer-created pluggable database, application container

an application container consist of exactly 1 application root
PDB plugged in to this root

## application seed
optional application PDB act as user-created PDB template

## seed PDB
system spplied template that CDB can use to create new PDB

## PDB
portable collection of schema, schema objects, non-schema objects

### standard PDB
`CREATE PLUGGABLE DATABASE`

### purpose
self-contained, fully functional oracle database

1. store data specific to an application
2. move data into different CDB
3. perform rapid upgrades
4. copy data quickly without loss of availability
5. reference data in different CDB

### proxy PDB
~ smbolic link file in Linux

1. aggregate data from multiple application model
2. enable application root in 1 CDB to propagate application changes to different application root

container name must be unique across all CDBs

# database link between PDB
use connected to 1 PDB must use db links to access another PDB











