# flatten 
select * 
from table(flatten(input => parse_json('[1,2,3]'))) f

# parse
select parse_json('{a: 1}'):a







