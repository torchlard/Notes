# intro
cross platform lang

borrow features from other lang: C, sh, awk, sed

# history
1.0: 1987
2.0: 1988
3.0: 1989

## 5.0
1994
rewrite interpreter
add new features: objects, references, modules

module: extend lang without modifying interpreter

## 5.002
introduce new prototype feature
CPAN as repository for perl language and modules

## 5.6
2000
include 64-bit support, unicode string representation, files > 2GB

## 5.8
improved unicode support, add new IO implementation, thread

## 5.20
subroutine signature, hash slices, postfix dereferencing

# interpreter
first convert programs into byte code, then into machine instructions


# data type
## scalar
preceded by $
either number, string, reference(address of variable)

## arrays
ordered lists of scalars
start from index 0
preceded by @

## hashes
access using keys as subscripts
preceded by %


# variable context
treat same variables different based on context

assign list to scalar: get list size

## context list
scalar
list
boolean
void
interpolative





