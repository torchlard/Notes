# Bigfile 
create tablespace made up of single large files rather than numerous small ones
- max 8 EB

system default to create smallfile tablespace
  - eg. SYSTEM, SYSAUX

## adv
significantly increase storage capacity
smallfile tablespace max 1024 files, but bigfile tablespace can have 1 file 1024 times larger


# SYSTEM
auto created, always online
can convert from dictionary to locally managed

## data dictionary
always contains data dictionary table for entire database

## pl/sql program
all data stored in program (procedure, functions, packages, triggers)
resides in SYSTEM tablespace


# SYSAUX
auxiliary table to SYSTEM tablespace
store database metadata that not in SYSTEM tablespace

# Undo
only storing undo information

# Default Temporary tablespace
when SYSTEM locally managed, must define at least 1 temporary tablespace
  - not necessary if SYSTEM dictionary managed

# multiple tablespace
recommend at least one additional tablespace to store user data separate from data dictionary information

# db admin use tablespace to
- create new tablespace
- add datafile
- set and alter default segment storage setting
- make readonly, read/write
- make temporary, permanent
- rename, drop

# management
locally managed(defulat): extent management by tablespace
dictionary managed: extent management by data dictionary

## adv of locally
auto tracks adjacent free space, no need to coalesce free extents
aviod recursive space management operation

## segment space management
### AUTO
use bitmap to manage free space within segments

### MANUAL
use free lists for managing free space within segments

# online, offline tablespace
can bring any tablespace other than SYSTEM online / offline

## readonly
eliminate need to backup and recovery

## temporary
manage space for sort operations more efficiently by designating >= 1 temp tablespace exclusively for sorts






