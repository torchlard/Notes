# config
elasticsearch.yml
jvm.options
log4j2.properties

```yaml
node.name: ${HOSTNAME}
network.host: ${ES_NETWORK_HOST}
```

# structure
index = database
index type = table

# command
curl -H "Content-Type: application/json" -XPOST "http://localhost:9200/indexname/typename/optionalUniqueId" -d "{ \"field\" : \"value\"}"

## put
update

create new
`curl -H "Content-Type: application/json" -XPUT "http://localhost:9200/hello/emp/2" -d '{"name":"laoxiao"}'`

bulk insert
`curl -H "Content-Type: application/json" -XPOST "localhost:9200/bank/_bulk?pretty&refresh" --data-binary "@accounts.json"`

## post
new


## delete

## get
curl -H "Content-Type: application/json" -XGET "http://localhost:9200/hello/emp/_search?q=name:'laoxiao'"

dsl
```bsh
curl -H "Content-Type: application/json" -XGET "http://localhost:9200/hello/employee/_search" -d
'{"query":
   {"match":
     {"last_name":"Smith"}
   }
}'
```

# index
index name must small letter, no `_`,`,`

# query DSL
sorts matching search results by relevance score
score = positive floating point number

## query context
how well document match query clause?

under `bool.must` 

## filter context
does document match query clause?

frequentty used filter cached automatically 
filter context passed to filter paramter (filter / must_not)

under `bool.filter` 

basic query
```js
query: {
  bool: {
    must: [
      {match: {title: "search"}},
      ...
    ],
    filter: [
      {term: {status: "published"}},
      ...
    ]
  }
}
```

## bool
more matches is better
default query for combining multiple leaf / compound query clauses

- socres combined
  - must: must appear
  - should: should appear
- executed in filter context
  - must_not: must not appear
  - filter: must appear


## boosting
return docs which match positive query, reduce score of docs match negative query

## constant_score
query that wrap another query, executes in filter context
all matching docs given same "const" _score

## dis_max
accept multiple queries, return any docs match any query clauses
use score of single best-matching query clause

## function_score
modify scores return by main query with functions
  - function may consider popularity, recency, distance, custom algorithm


# full text
## intervals
use matching rules constructed from small set of definitions
produce sequences of minimal intervals that span terms in body of text

### match
- *query
- max_gaps: max num of pos between matching terms (-1: no restriction, 0: next to each other)
- ordered, analyzer, filter
- use_field: match intervals from this field 

### prefix
- *prefix, analyzer, use_field

### wildcard
- *pattern: single char`?`, >=0 char`*`
- analyzer, use_field

### all_of
- *intervals: array of rules to combine (overall score)
- max_gaps, ordered, filter

### any_of
- *intervals, filter

### filter
- after: query used to return intervals that follow interval from filter
- before: occur before filter
- contained_by, containing
- not_contained_by, not_containing, not_overlapping
- overlapping, script


# common options
## fuzziness
0..2 : match exactly
3..5 : 1 edit allowed
>5 : 2 edits allowed

```js
fuzziness: 1,
fuzzy_transpositions: false
```

## synonyms
"ny, new york" = (ny OR ("new york"))

default auto_generate_synonyms_phrase query = true


```js
match_bool_prefix: { message: "quick brown f" }

// ===

bool: {
  should: [
    {term: {message: "quick" }},
    {term: {message: "brown" }},
    {prefix: {message: "f" }}
  ]
}
```
# match_phrase
analyze text, create phrase query out of analyzed text

# match_phrase_prefix
- *query, analyzer
- max_expansions: max #terms last provided term of query value will expand
- slop: max #positions allowed between matching tokens
- zero_terms_query: whether no documents returned if analyzer removes all tokens

# multi_match
```js
multi_match: {
  query: "this is a test",
  fields: ["subject", "message"]
}

fields: ["f*"]  // multiple fields

fields: ["subject^3", "message"]  // subject 3 times importatn
```

## type
best_fields: default
most_fields: doc match nay field, combine _score from each field
cross_fields
phrase: use _score from best field

# query string query
use syntax to parse and split provided string based on operator

`(new york city) OR (big apple)`






