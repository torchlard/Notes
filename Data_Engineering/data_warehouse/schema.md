# conceptual modeling
## Star schema
fact table in middle connected to set of dimension tables
fact table: contain factual/quantitative data called measure about a business

dimension table: descriptive data about business
PK of fact table = composite key of all foreign keys

- every dimension only represented by one-dimension table
- dimension table contain set of attributes, join to fact table using FK
- dimension table not joined to each other
- dimension table are not normalized

## Snowflake schema
sometimes dimension in star schema forms natural hierarchy
  - eg. markets within state/region/country
2 choice
1. include all information in big flat table
2. normalize tables => snowflake schema

- use smaller disk space
- easier to implement a dimension added to schema
- query performance reduced due to multiple tables
- need more maintenance efforts


## Galaxy schema / Fact constellation
- multiple fact tables share dimension tables
- collection of starts 

for performance reason
- eg. various users require differnet levels of aggregation

## star cluster schema
star schema is base to design star cluster schema
few essential dimension table from star schema are snowflaked



# star VS snowflake
| star                   | snowflake              |
|------------------------|------------------------|
| denormalized           | normalized             |
| cube processing faster | cube processing slower |

- dimensions in schema separated into separate dimensions based on various levels of hierarchy
- eg. geography has 4 level: region, country, state, city => galaxy schema have 4 dimension
























