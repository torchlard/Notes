# install and run
sysVinit `sudo -i service elasticsearch start`



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
`curl --user <username>:<password> -H "Content-Type: application/json" -XPOST "http://localhost:9200/indexname/typename/optionalUniqueId" -d "{ \"field\" : \"value\"}"`

get all index `curl --user elastic:123456 'localhost:9200/_cat/indices?v'`

## put
update

create new
`curl -H "Content-Type: application/json" -XPUT "http://localhost:9200/hello/emp/2" -d '{"name":"laoxiao"}'`

bulk insert
`curl -H "Content-Type: application/json" -XPOST "localhost:9200/bank/_bulk?pretty&refresh" --data-binary "@accounts.json"`

## post
new

## delete
delete document of id 1 `curl -XDELETE "http://localhost:9200/metricbeat-7.5.2/_doc/1"`
delete index `curl -XDELETE "http://localhost:9200/metricbeat-7.5.2"`
can use wildcard * `curl -XDELETE "http://localhost:9200/metricbeat*"`


## get
prettify `curl -H "Content-Type: application/json" -XGET "http://localhost:9200/hello/emp/_search?q=name:'laoxiao'" | jq .`

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

# Compound Query
## bool
more matches is better
default query for combining multiple leaf / compound query clauses

- socres combined
  - must: must appear
  - should: should appear
- executed in filter context
  - must_not: must not appear
  - filter: must appear

OR = should
AND = must
NOR = should_not

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


# FULL Text Query
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

## match_phrase
analyze text, create phrase query out of analyzed text

## match_phrase_prefix
- *query, analyzer
- max_expansions: max #terms last provided term of query value will expand
- slop: max #positions allowed between matching tokens
- 
- zero_terms_query: whether no documents returned if analyzer removes all tokens

## multi_match
```js
multi_match: {
  query: "this is a test",
  fields: ["subject", "message"]
}

fields: ["f*"]  // multiple fields

fields: ["subject^3", "message"]  // subject 3 times importatn
```

### type
best_fields: default
most_fields: doc match nay field, combine _score from each field
cross_fields
phrase: use _score from best field

## query string query
use syntax to parse and split provided string based on operator

`(new york city) OR (big apple)`
+ *query

## simple query string
simple syntax to parse and split provided query string 

+ *query, fields, default_operator

### operator
AND `+`, OR `|`
negate `-`, at end of term signify prefix query `*`
after word signifies fuzziness `~N`
after phrase signifies slop amount `~N`
  - after phrase where N = max #position allowed between matching tokens


# Geo query
suuport 2 types of geo data
1. lat/lon pairs
2. geo_shape fields: point,line,circle,polygon,multi-polygon

# Shape query
query doc that contain fields indexed using shape type

# Joining Queries
very expensive to use full SQL-style joins in elasticsearch
provide
1. nested query
2. has_child, has_parent

# Span queries
low-level positional query which provide expert control over order and proximity of specified terms

# Specialized queries
queries that not fit into other groups
- distance_Feature
- more_like_this
- percolate
- rank_feature
- script
- script_score
- wrapper

# Term-level queries
find docs based on precise values in structured data
eg. data range, IP address, price, productID

not analyze exact terms, instead match exact terms stored in fields
- exists
- fuzzy
- ids
- prefix
- range


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

# Scripts
```js
script: {
  lang: "expression",
  source: "doc['my_field']*multiplier", // source of script
  params: { // named param passed into script as variables
    multiplier: 2
  }
}
```
all scripts cached by default
only need recompiled when updates occur


# Aggregation
aggregation framework provide aggregated data based on search query
unit-of-work builds analytic information over set of documents

## bucketing
build buckets, each associated with key and document criterion
  - all buckets criteria evaluated on every doc in context
  - when criterion matches, doc fall in relevant bucket

## metric
keep track and compute metrics over set of docs

```js
aggregations: {
  '<aggre_name>': {
    '<aggre_type>': {
      '<aggre_body'
    }
    [, meta: { [...] }] ?
    [, aggregations: {[ ... ]+ }]
  }
}

aggs: {
  "avg_grade": {
    avg: {
      field: "val",
      script: {
        lang: "painless",
        source: "_value * params.correction",
        params: {
          correction: 2.0
        }
      },
      missing: 10   // missing value treat as
    }
  }
}

weighted_avg: {
  value: {field: "grade"},
  weight: {field: "weight"}
}

// approximate count of distinct values
cardinality: { field: "type"}

scripted_metric: {
  init_script: "stat.transaction = []",
  map_script: "state.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1*doc.amount.value)",
  combine_script: "double profit=0; for(t in state.transactions){ profit += t } return profit",
  reduce_script: "double profit=0; for(a in states) {profit += a} return profit"
}

```
extended_stats: compute statistics over numeric values (eg. sum_of_sq, variance)
max, min



## matrix
operate on multiple fields and produce matrix result based on value extracted from requested doc fields
not support scripting

## pipeline
aggreagte output of other aggregations and associated metrics

aggregations can be nested, no hard limit on level/depth 


# plugin
`sudo /usr/share/elasticsearch/bin/elasticsearch-plugin install analysis-smartcn`
analyzer support simplified chinese and mixed  chinese-english text, traditional not supported
integrate smart chinese analyzer into elasticsearch

lucene provide support for chinese sentence and word segmentation with 
- HMM Chinese Tokenizer
- SmartChineseAnalyzer










