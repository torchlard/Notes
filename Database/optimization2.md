# Optimize schema, data type
1. avoid extreme, avoid using very complex query
2. avoid NULL
3. use same data type to store similar / related values
4. use integer for identifiers if you can
5. watch out variable-length strings

## speed up alter table
1. create new table, move data to new one, delete old table
=> too long time
2. swapping server around, perform ALTER on non-production server
3. build new table, rename it, drop to swap two

not all ALTER TABLE cause table rebuild
expensive way:
```sql
ALTER TABLE sakila.film 
MODIFY COLUMN rental_duration TINYINT(3) NOT NULL DEFAULT 5;
```
[any MODIFY COLUMN cause table rebuild]

fast way:
```sql
ALTER TABLE sakila.film
ALTER COLUMN rental_duration SET DEFAULT 5;
```

following no table rebuild:
1. remove AUTO_INCREMENT
2. add, remove, change ENUM/SET constants

low cost changing
1. create empty table exactly same layout
2. FLUST TABLES WITH READ LOCK -> close all table in use, prevent tables opened
3. swap .frm files
4. UNLOCK TALBES -> release lock


# index
mysql can only search efficiently on leftmost prefix of index

## B-tree
default indexing
storage engine might use different storage structure internally
- NDB cluster storage use T-tree data structure
- InnoDB use B+ tree

- MyISAM refer to indexed row by physical storage location
- InnoDB refer by primary key value
different storage engine have different type of pointers to data

### type of queries
match full value
match leftmost prefix
match column prefix
match range of values
match one part exactly, match range on another part
index-only query

### shortcoming
1. lookup not start from leftmost side 
(eg. find all people named Bill, all people born on certain date)
2. can't skip columns in index
3. can't optimize access with any column to right of first range condition
```sql
WHERE last_name="Smith" 
  AND first_name LIKE 'J%' 
  AND dob='1976-12-23'
```

## hash index
hash table, useful for exact lookup
compute hash code for each row
- stores hash code in index, store pointer to each row in hash table
if multiple value same hashcode, store row pointers in linked list

adaptive hash index:
- when notice some index value can be accessed very frequently, 
  builds hash index for them in memory on top of B-tree index

### build own hash index
still use B-tree index for lookup using key's hash values


## R tree index
must use GIS function

## full text index
find keyword in text instead of comparing values directly to values in index
- subtleties (stopword, stemming, plurals, Boolean searching)
- for MATCH AGAINST operation

## advantages 
1. reduce data to examine
2. avoid sorting and temp table
3. turn random IO to sequential IO

1 star: place relevant rows adjacent to each other
2 star: rows sorted in order query needs
3 star: contains all columns needed for query

## tips
small table: index no use 
medium to large table: index very effective
enormous table: overhead of indexing start adding up
TB scale table: index replaced by per-block metadata















