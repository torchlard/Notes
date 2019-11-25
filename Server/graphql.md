# GraphQL
query language for API + server-side runtime for executing queries using type system

# fields
```js
query:
{
  hero {
    name  // can return single item / list of items
  }
}

result:
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```
## arguments
```js
query:
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}

result:
{
  "data": {
    "human": {
      "name": "Luke fds",
      "height": 5.6430448
    }
  }
}
```
replace making multiple API fetches

## alias 
two `hero` conflict, so alias to empireHero,jediHero
```js
{ 
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}

result:
{
  "data": {
    "empireHero": {
      "name": "Luke"
    },
    "jediHero": {
      "name": "R2"
    }
  }
}
```
## fragment
repeat reusable unit, eg. query 2 friends

`query`: operation type
`HeroComparison`: operation name
```js
query HeroComparison($first: Int = 3) {
  leftComp: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComp: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

# operation type
query
mutation
subscription

# variables
all declared variables must be scalars, enums, input object types
avoid doing manual string interpolation to construct dynamic queries

```js
// variable def: ($episode: Episode)
// default variable: (xx: xx = ??)
query HeroNameAndFriends($episode: Episode = jp) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}

// variables
{
  "episode": "JEDI"
}
```

# directives
dynamically change structure and shape queries using variables
```js
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}

variable:
{
  "episode": "JEDI",
  "withFriends": false
}

result:
// false
{
  "data": {
    "hero": {
      "name": "R202"      
    }
  }
}
// true
{
  "data": {
    "hero": {
      "name": "fds",
      "friends": [
        {"name": "abc"},
        {"name": "def"}
      ]
    }
  }
}
```














