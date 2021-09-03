# identifying relationship
existence of row in child table depends on row in parent table

eg. Book and author
eg. A person has >= 1 phone number
to suppor multiple phone number, make second table PhoneNumbers
  - PK includes `person_id` ref `Person`

# non-identifying relationship
PK attribute of parent MUST NOT become PK attributes of child

eg. foreign key on `Person.state` ref PK of `States.state`
Person is child table wrt. States, but row in Person not identified by `state` attribute
  - state is not part of PK of Person

# Primary Key
minimal set of attributes uniquely specify a row in table

# relational database
database based on relational omdel





















