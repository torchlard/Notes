# concept
## format
bson = binary format of json

## _id
always first field, as primary key

options:
- auto generate ObjectId
- auto incrementing number
- generate UUID in application code
- driver's BSON UUID facility

## data structure
String, Integer, Boolean
Double
Min/Max keys: compare a value with max & min of BSON element
Arrays
Timestamp, Object, Null
Symbol: basically equivalent to String
Date
ObjectID
Binary date
Code: store JS code
Regular Expression
