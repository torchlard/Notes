# EXPLAIN
All
最坏的情况,全表扫描

index
和全表扫描一样。只是扫描表的时候按照索引次序进行而不是行。主要优点就是避免了排序, 但是开销仍然非常大。
如在Extra列看到Using index，说明正在使用覆盖索引，只扫描索引的数据，它比按索引次序全表扫描的开销要小很多

range
范围扫描，一个有限制的索引扫描。key 列显示使用了哪个索引。
当使用=、 <>、>、>=、<、<=、IS NULL、<=>、BETWEEN 或者 IN 操作符,用常量比较关键字列时,可以使用 range

ref
一种索引访问，它返回所有匹配某个单个值的行。
此类索引访问只有当使用非唯一性索引或唯一性索引非唯一性前缀时才会发生。

这个类型跟eq_ref不同的是，它用在关联操作只使用了索引的最左前缀，或者索引不是UNIQUE和PRIMARY KEY。
ref可以用于使用=或<=>操作符的带索引的列。

eq_ref
最多只返回一条符合条件的记录。使用唯一性索引或主键查找时会发生 （高效）

const
当确定最多只会有一行匹配的时候，MySQL优化器会在查询前读取它而且只读取一次，因此非常快。
当主键放入where子句时，mysql把这个查询转为一个常量（高效）

system
这是const连接类型的一种特例，表仅有一行满足条件。

Null
意味说mysql能在优化阶段分解查询语句，在执行阶段甚至用不到访问表或索引（高效）


# id
larger id execute first


# select type
simple: simple query, not include subquery and union
primary: include union/subquery, outermost notify as primary
subquery: subquery inside query
derived: temp table from subquery, inside FROM
union: 2nd subquery in UNION and later subquery ntoed UNION, 1st noted PRIMARY
union result: select from temp table
dependent union: satisfy UNION condition, and 2nd | later SELECT, rely on external query
dependent subquery


# extra
using filesort:
2 ways to get ordered result: by sorting / use index
use sorting (maybe in memory sort)

using temporary:
use temp table store temp result, normally appear in GROUP BY & ORDER BY

not exist: 
optimize LEFT JOIN

using index:
used covering index, no need read data file
if 'using where', then index used to find index value
if no 'using where', index used to read data

using join buffer:
used buffer in join

select tables optimized away:
min/max operation without using GROUP BY

distinct:
optimize distinct, stop after finding first matching row



# optimizer options
index_merge=on,
index_merge_union=on,
index_merge_sort_union=on,
index_merge_intersection=on,
index_merge_sort_intersection=off,

engine_condition_pushdown=off,
index_condition_pushdown=on,
derived_merge=on,
derived_with_keys=on,

firstmatch=on,
loosescan=on,
materialization=on,
in_to_exists=on,

semijoin=on,
partial_match_rowid_merge=on,
partial_match_table_scan=on,
subquery_cache=on,

mrr=off,
mrr_cost_based=off,
mrr_sort_keys=off,

outer_join_with_cache=on,
semijoin_with_cache=on,

join_cache_incremental=on,
join_cache_hashed=on,
join_cache_bka=on,

optimize_join_buffer_size=off,
table_elimination=on,

extended_keys=on,
exists_to_in=on,
orderby_uses_equalities=on,
condition_pushdown_for_derived=on,
split_materialized=on

























