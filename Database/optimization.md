# subquery

## in (select ...), any (select ...)
### semi-join subquery
- correlated
table pullout, first match, loose scan, duplicate weedout

- uncorrelated
table pullout, first match, loose scan, duplicate weedout
materialization, +scan, +lookup

### non-semi-join subquery
- correlated

- uncorrelated
materialization

## exists (select ...)
direct exec

## not in (select ...)
null-aware materialization

## scalar-context (select ...)
direct execution

## from (select ...)
- subquery with grouping

- subquery without grouping

## cmp all/any (select ...)  {cmp: <, <=, >, >=}
min -> max rewirte
subquery caching



# subquery cache
store result together with correlation in cache, avoid re-execution of subquery 

## administration
`set optimizer_switch='sbuquery_cache=on';`


index_merge=on
index_merge_union=on
index_merge_sort_union=on
index_merge_intersection=on
index_merge_sort_intersection=off

engine_condition_pushdown=off
index_condition_pushdown=on
derived_merge=on
derived_with_keys=on
firstmatch=on
loosescan=on
materialization=on

in_to_exists=on
semijoin=on
partial_match_rowid_merge=on
partial_match_table_scan=on
subquery_cache=on

mrr=off
mrr_cost_based=off
mrr_sort_keys=off

outer_join_with_cache=on
semijoin_with_cache=on
join_cache_incremental=on
join_cache_hashed=on
join_cache_bka=on
optimize_join_buffer_size=off
table_elimination=on

extended_keys=on
exists_to_in=on
orderby_uses_equalities=on
condition_pushdown_for_derived=on
split_materialized=on







