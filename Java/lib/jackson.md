# intro
popular serialize/deserialize framework
most popular json parser, default in Spring MVC

# adv
few dependency, easy to use
use lower memory, better performance
flexible API, easy customization and extension

# structure
jackson-core: 
include JsonParser, JsonGenerator

jackson-annotations:
standard annotation function

jackson-databind:
ObjectMapepr 

# syntax

ignore logical properties in JSON serial/deserialize:
@JsonIgnore: class property level
@JsonIgnoreProperties: class level, specify logical properties
@JsonIgnoreType: class level, ignore complete class

## logical property
property name that display in json

@JsonProperty("bookCategory")
private String category;

## property visibility
getter: serialization
setter: deserialization

if only public setter, no public getter => only deserialize
if property public => can both serail/deser
























