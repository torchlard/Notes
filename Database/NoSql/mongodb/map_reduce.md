
## map-reduce
1. map stage
process each document, emit >=1 objects for each input document
2. reduce stage
combine output of map operation
3. finalize stage (optional)
make final modification to result

use custom js functions to perform map,reduce,finalize operations
- arrow function not working, since no this binding

can write results to collection / return results inline
- if return inline, size must < 16MB

```sql
select sex,sum(num)
from people
group by sex
where age is not null
```
==>
```js
db.people.mapReduce(
  function(){ emit(this.sex, this.num) },
  function(key,value){ return Array.sum(value) },
  {
    query: { age: {$exists: true} },
    out: "xxx"
  }
)


db.people.mapReduce(
    function(){
        this.obj2.forEach(i => emit(i.sku, {count:1, qty:i.qty}))
    }, 
    function(key,vals){
        return vals.reduce((i,j) => {
            return {count: i.count+j.count, qty: i.qty+j.qty }
        }, {count:0, qty: 0})
    },
    {
        out: {merge: "map_reduce_ex"},
        // query: { age: {$exists: true}},
        finalize: function(key, reducedVal){
            reducedVal.avg = reducedVal.qty / reducedVal.count;
            return reducedVal;
        }
    }
)


```
in general map-reduce less efficient, more complex

### map-reduce and sharded collection
if input = sharded collection, auto dispatch map-reduce job to each shard in parallel
if output = sharded collection, shard using _id as shard key

- during post-processing, each shard put result for its own chunks from other shards
- run final reduce/finalize => write locally to output collection
