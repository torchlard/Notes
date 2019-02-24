# introduction
## phases
1. Lex : source file -> individual words(token)
2. Parse : analyse phrase structure
3. Semantic Action : buid abstract syntax tree
4. Semantic analysis : relate variable -> definitions, check expression, find what each phrase mean
5. Frame layout : place variable into activation records (stack frame)
6. Translate : produce intermediate representation (IR) trees
7. Canonicalize : hoist side effects out of expression, clean conditional branches
8. Instruction selection : group IR tree nodes into clumps -> action of target machine instruction
9. control flow analysis : analyze sequence of instruction
10. Dataflow Analysis : gather info about information flow through variables of program
11. Register allocation : choose register hold each variable, temp values used by program
12. Code Emission : temp names in machine instruction -> machine registers

some compiler combine (Parse, semantic analysis, translate, canonicalize)
useful abstraction: 
- context-free grammar -> parsing
- regular expression -> lexical analysis

## syntax tree
`a := 5+3; b := (print(a, a-1), 10*a); print(b)`

![](img/syntax_tree.png)

for each variant(CompoundStm, AssignStm) make constructor to malloc, init data structure
1. trees described by grammar
2. tree described by >=1 typedefs -> symbol in grammar
3. each typedef -> pointer in struct
4. each struct contains kind field -> enum showing different variant
5. if >1 value-carrying symbol in right-hand side rule, union component itself comprising test value
6. if =1 value-carrying symbol, union -> value
7. every class constructor init all fields

# Lexical analysis
stream of char -> stream of names,keywords,punctuation
token:
- id, num, real, if, comma, noteq, lparen ...
nontoken:
- comment, preprocessor directive, macro, blanks/tabs/newline

identifier: sequence of letter and digits, first char must be letter/_
## deterministic finite automata
regex

```
if              => if
[a-z][a-z0-9]*  => ID
[0-9]+          => NUM
([0-9]+"."[0-9]*)|([0-9]*"."[0-9]+) => REAL
("--"[a-z]*"\n")|(" "|"\n"|"\t")+   => 'do nothing'
.   => error()
```

![](img/combined_finite_automata.png)

find longest match, longest initial substring of input that is valid token

## non-deterministic finite automata (NFA)
static, declarative regular expression -> simulatable, quasi-executable NFA




















