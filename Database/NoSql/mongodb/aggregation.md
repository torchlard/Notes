
# aggregation stages
## addField
add fiel
random thing
## bucket
```js
$bucket: {
  groupBy: // group by field
  boundaries: // specify boundaries for each bucket
  dafault: // for elements not fall into any buckets
    // eg. [0,200,400] -> [0,200),[200,400)
  output: {
    // accumulator: expression
  }
}

// bucket
{ $bucket: {
    groupBy: "$pop",
    boundaries: [0,10,20,100,400,1000,5000,10000],
    default: "others",
    output: {
        "count": {$sum: 1},
        "state": {$addToSet: "$state"}
    }
  }
}
```

## facet
facet contains 2 components:
bucket by price, bucket by year

```js
db.artwork.aggregate([
  {
    $facet: {
        "price": [{
            $bucket: {
              groupBy: "$price",
              boundaries: [0,200,400],
              default: "others",
              output: {
                  "count": {$sum: 1},
                  "artwork": { $push: {"title":"$title", "price":"$price","year":"$year"}}
              }
            }
        }],
        "year": [{
            $bucket: {
              groupBy: "$year",
              boundaries: [1890,1910,1920,1940],
              default: "unknown",
              output: {
                  "count": {$sum:1},
                  "artwork": {$push: {"title":"$title", "price":"$price", "year":"$year"} }
              }      
            }
        }]
    }
  }
])
```
## bucketAuto
group documents into 
```js
{$bucketAuto: {
        groupBy: "$price",
        buckets: 5,
        output: {
            "count": {$sum: 1}
            ,"artwork": { $push: {"title":"$title", "price":"$price","year":"$year"}}
        }
    }}
```
## collStats
get collection information
```js
{ $collStats: {
    latencyStats: { histograms: true},
    storageStats: {},
    count: {}
}}
```
namespace, shard name, host, localTime, latencyStats, storageStats, count

## count
```js
{ $count: "result"}
```

## graphLookup
```js
$graphLookup: {
    from: "employees",  // target collection
    startWith: "$reportsTo",  // start point of recursive search
    connectFromField: "reportsTo",  // field to recursively match connectToField
    connectToField: "name", // match value of connectFromField
    as: "reportingHierarchy"  // array field name
}

// result:
"reportingHierarchy" : [
    { "_id" : 1, "name" : "Dev" },                          // depth 2
    { "_id" : 2, "name" : "Eliot", "reportsTo" : "Dev" },   // depth 1
    { "_id" : 4, "name" : "Andrew", "reportsTo" : "Eliot" } // depth 0
  ]
```

## lookup
```js
db.classes.aggregate([  // join from 'classes' collection
    { $lookup: { 
        from: "members",   // join to 'members' collection
        localField: "enrollmentlist", // join from 'classes' field
        foreignField: "name", // join to 'members' field
        as: "fromItems" // joined result of 'members' data
    }}, {
      $replaceRoot: { // replace all existing fields in input document, including _id
        newRoot: { $mergeObjects: [ // merge fromItems to result collection
            { $arrayElemAt: ["$fromItems", 0] },  // return elem at specific index
              "$$ROOT"  // reference root document (top-level)
        ]}
      }
    }, 
    { $project: { fromItems: 0 } } // ignore fromItems field
])
```
## replaceRoot
`{ $replaceRoot: {newRoot: "$obj"}}`
obj must be a js object, non empty

## out
create new collection in current database if not exists
replace existing collection

1. create temp collection
2. copy indexes from existing collection to temp collection
3. insert documents into temp collection
4. calls db.collection.renameCollection with dropTarget:true
`{$out: "out_collection"}`

## redact
```
mongoDB <---> trusted middleware <----> application
      aggregation               requests
      pipeline with 
      $redact
```
any valid expression that resolve to 
- $$DESCEND: return fields at current level, exclude embedded doc
- $$PRUNE: exclude all fields, no further insepct excluded fields
- $$KEEP: keep all field, no further inspection

## sample
random pick some documents
`{$sample: {size: 3}}`

# aggregate operators
## arithmetic
```
$abs, $add, $subtract, $multiply, $divide
$avg, $ceil, $floor, $cmp, $exp
$ln, $log, $log10
```
## logic
```
$allElementsTrue, $anyElementTrue
$cond, $switch
$eq, $gt, $gte
$truncate
```
## string
```
$concat, $strcasecmp, $strLenBytes
$substr, $substrBytes, $toLower, $toUpper
```
## collection
```
$arrayElemAt, $arrayToObject
$concatArrays
$indexOfArray, $in
$slice, $split, $size
```
### group stage
```
$addToSet
$first, $last
```
## datetime
```
$dateFromParts, $dateToParts, $dateFromString, $dateToString
$dayOf(Month|Week|Year), $hour
```
## set
```
$setDifference, $setEquals, $setIntersection
$setIsSubset, $setUnion
```

## filter
```js
$filter: {
    input: "$items",
    as: "item",
    cond: {
        $gte: ["$$item.price", 100]
    }
}
```
## let
```js
$let: {
  vars: { // create variables
    total: {$add: ['$price', '$tax']},  // create total
    discounted: { $cond: {if: '$applyDiscount', then:0.9, else:1} }
  },
  // ref to total,discounted, return value
  in: { $multiply: ["$$total", '$$discounted'] }  
}
```

## map
```js
$map: {
  input: "$quizzes",
  as: "grade",
  in: { $add: [ "$$grade", 2 ] }
}
```
## objectToArray
{l:25, w:10, uom:"cm"} 
=> [{"k":"l", "v":25}, {"k":"w","v":10}, {"k":"uom", "v":"cm"}]

## switch
```js
$switch: {
  branches: [
    {case: {$gte:["$year", 1918]}, then: "well" },
    {case: {$eq: ["$year", 1893]}, then: "ok"}
  ],
  default: "no..."
}
```

## zip
`$zip: {inputs: [[1,2,3],["a","b","c"]]} => [[1,"a"],[2,"b"],[3,"c"]]`



# aggreagation pipeline
```sql
select sex,sum(num)
from people
group by sex
where age is not null
```
==>
```js
db.people.aggregate([
  {$match: {age: {$exists: true}}},
  {$group: {_id: "$sex", total: {$sum: "$num"} }}
])
```

```js
select sum(pop) totalPop, state
from zips
group by state
having totalPop >= 10*1000*1000

==>

db.zips.aggregate([
    { $group: { _id: "$state", totalPop: {$sum: "$pop"}}},
    { $match: {totalPop: {$gte: 10*1000*1000}}}
])


db.zips.aggregate([
    { $group: { _id: { state: "$state", city: "$city"} , pop: {$sum: "$pop"}}}
    ,{ $group: {_id: "$_id.state", avgCityPop: {$avg: "$pop"}, totalPop: {$sum: "$pop"} }}
    
])

db.zip.aggregate([
    { $group: { _id: { state: "$state", city:"$city" }, pop: {$sum: "$pop"} }},
    { $sort: {pop: 1}},
    { $group: { 
        _id: "$_id.state", 
        biggestCity: {$last: "$_id.city"}, biggestPop: {$last: "$pop"},
        smallestCity: {$first: "$_id.city"}, smallestPop: {$first: "$pop"},
        total: {$sum: "$pop"}
    }},
    {$project: { _id:0, state: "$_id", totalPop: "$total",
        biggestCity: {name: "$biggestCity", pop: "$biggestPop"},
        smallestCity: {name: "$smallestCity", pop: "$smallestPop"}
    }}
])

// 5 most common likes
db.users.aggregate([
  { $unwind : "$likes" },
  { $group : { _id : "$likes" , number : { $sum : 1 } } },
  { $sort : { number : -1 } },
  { $limit : 5 }
])


db.zips.aggregate(
  {$group: {_id: "$state", total: {$sum: 1}}} ,
  {$addFields: { homework: {$add: ["$total",300]}  , total:{tot: "$total", b:2}  }},
  {$addFields: { apk: {$concatArrays: [[1,2], [3,4]] }}}
)


```

first stage: filter documents
second stage: group documents by certain field

can use index to improve performance during some stages

### pipeline
consist of stages
pipeline stages can appear multiple times except $out,$merge,$geoNear

### pipeline expression
specify transformation to apply to input documents
- only operate on current document, cannot refer to others
- in-memory transformation
- generally stateless, only evaluated when seen by aggregation except accumulator
  - accumulator use $group to maintian state (total,max,min,related data)

### early filtering
if only need subset of data => use $match, $limit, $skip
