# Relation
row = data, column = attribute of entities
same kind within column
unique name each column
cell holds single vlaue
order of row,column unimportant
no 2 rows identical

# Functional Dependency
insertion anomaly: 
- cannot record fact that fee for Carrigg Hall is $1500 until student move in
update anomaly: data duplication
delete anomaly: if delete student 150, lost cost $1100 of Ingersoll

X -> Y: X determines Y
LHS = deteerminant
composite determinant: consist of multiple attributes

## rules
### Armstrong's axiom
1. if Y is subset of X, then X -> Y
2. if X -> Y, then WX -> WY, XW -> YW
3. if X->Y, Y->Z, then X->Z
4. if X->Y, X->Z, then X->YZ
   - if X->YZ, then X->Y, X->Z

# Key
key: set of attributes uniquely determine all data in row
key attribute: part of candidate key/candidate key by itself

candidate key:
1. determines all other attrs 
2. minimal: no proper subset of key determines all other attrs
superkey:
1. determines all other attrs

primary key: candidate key chosen as principal


# Normal Form
1NF, 2NF, 3NF, BCNF, 4NF, 5NF, DK/NF
Normalization
- reversible replacement of relation
- more regular and simpler structure

Normal form: set of criteria for table

## 1NF
any table qualifies as relation
partial dependency: 
- subset W of X such that W->Y, then Y partially dependent on X

## 2NF
- 1NF with partial dependency removed
- every non-key attribute must depend on entire (candidate) key, not subset of it

if relation has single attribute as key => must be 2NF

update anomaly
delete anomaly
insertion anomaly

transitive dependency:
- X->Y, Y->Z and X->Z, then Z transitively dependent on X

## 3NF
criteria
- No transitive dependency
- every non-key attribute must depend only on (candidate) key, not another non-key attribute

deletion anomaly
insertion anomaly

## BCNF
criteria
- every determinant (LHS) must be a key (no dependency among key attrs)
- part of key cannot determines part of key
- non-key cannot determines part of key

relation with only 2 attributes => must be BCNF

## Normalization process
1. identify every funcional dependency
2. identify every candidate key
3. if determinant not candidate key
  - move column to new relation, make it primary key, leave copy as foreign key
4. repeat until every determinant is candidate key

## advantage/disadv
adv
- eliminate modification anomalies
- reduce duplicated data
  - eliminate data integrity problem
  - save space
disadv
- more complicated SQL
- extra work dbms, slower application

# Decomposition
1. original table recoverable by using natural join on tables
2. all functional dependencies can be derived 

# strong entity
exist on its own
# weak entity
depends on presence of another entity






















