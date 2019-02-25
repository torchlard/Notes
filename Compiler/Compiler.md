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
## deterministic finite automata (DFA)
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

![](img/non_deterministic_finite_automata.png)

## NFA -> DFA
can avoid need to guess by trying all possibility at once

for every state, we compute ε-closure

start: {1,4,9,14}
i: {2,5,6,8,15}
n: {6,7,8}

string "in":
one of possible state set is 8, which is final => ID

edge(s,c)
- set of all NFA states reachable from state S with label c

## optimization
too costly to do on every char in source program
-> do all sets-of-states calculations in advance
- each set of NFA correspond to 1 DFA state

![](img/NFA2.png)

several members are final => need rule priority
after DFA constructed, state array -> trans array used for lexical analysis

automaton is suboptimal: not smallest one recognize same language
=> apply algorithm to minimize by finding equivalent rules

states s1,s2 equivalent when 
- machine starting in s1 accept "σ" <=> starting in s2 accepts "σ"
- both final / non-final
- for any symbol c, `trans[s1,c] = trnas[s2,c]`

computing ε-closure efficiently by keeping queue / stack of states
regex converted directly to DFAs

DFA transition table very large and sparse (states x symbols)


## start states
regular expression: static, declarative
automata: dynamic, imperative

declare set of start states, each regex prefixed by set of valid start states


# Parsing
```
digits = [0-9]+
sum = expr "+" expr
expr = "("sum")"|digits

(109+23)
61
(1+(250+3))
```
since impossible for N states machine remember () nesting depth > N
=> sum, expr cannot be regex

## context free grammars

grammars define syntatic structure declaratively -> describe structure of lexical tokens
symbol -> symbol symbol ... symbol

symbol = terminal(token from alphabet of string) | non-terminal(appear on LHS of some production)
one non-terminal -> start symbol 

terminal symbol `id print num , + ( ) := ;`
```
a := 7;
b := c + (d := 5 + 6, d)
==>
id := num; id := id + (id := num + num, id)
```

## parse tree
connect each symbol in derivation 
### ambiguous grammars
derive sentence with 2 different parse trees
```
S -> S: S         E -> id     
S -> id := E      E -> num        L -> E
S -> print(L)     E -> E + E      L -> L, E
                  E -> (S, E)

target: `1-2-3`
two possible parse trees:
E -- E -- E -- 1
       -- (-)
       -- E -- 2
  -- (-)
  -- E -- 3
result = (1 - 2) - 3 = -4

E -- E -- 1
  -- (-)
  -- E -- E -- 2
       -- (-)
       -- E -- 3       
result = 1 - (2 - 3) = 2       
```

E: expression, T: term (things you add), F: factor (things you multiply)

## predictive parsing
recursive descent

FIRST(T*F) = {id, num, (}
must keep track of which symbols can produce empty string -> nullable
FOLLOW(X): set of terminals that can immediately follow X

choose one of these clauses based on next token T of input
if we choose right rpoduction for each (X,T), then we can write recursive-descent parser
predictive parsing table
- all info encoded as 2D table of productions, with non-terminals X, terminals T

duplicate entries => predictive parsing won't work
LL(1) [Left-to-right parse]: no duplicate entries
examine left-to-right input in one pass

recursive-descent parsent only look at next token in input
generalize notion of FIRST set to first k tokens of string
=> make LL(k) [rarely done]

## Elimilate left recursion
```
E -> E + T
E -> T
=== rewirte using right recursion ==>
E -> T E'
E' -> + T E'
E' ->

S -> if E then S else S
S -> if E then S
=== left factor ===>
S -> if E then S X
X ->
X -> else S
```

## LR parsing
postpone decision until seen input token corresponding to entire right-hand side of production
LR(k) = rightmost-derivation, k-token lookahead, left-to-right parse

```
a := 7;
b := c + (d := 5 + 6, d)
```
parser has stack, input
Shift: move first input token to top of stack
Reduce: choose gammar rule X -> A B C; pop C,B,A from top of stack; push X onto stack
$: accept end

```
s_n: shift into state n
g_n: goto state n
r_k: reduce by rule k
a: accept
  : error

rules:
0: S' -> S$
1: S -> (L)
2: S -> x
3: L -> S
4: L -> L , S
```
treat shift and goto action as edges of DFA, scan stack

closure: add more items to set of items when "." to left of non-terminal
goto: move dot past symbol X in all items

![](img/grammar_class.png)

grammar is LALR(1) if LALR(1) parsing table contains no conflict
All SLR grammars are LALR(1), not vice versa
any reasonalbe PL has LALR(1) grammar => standard for PL and automatic parser generators

## LR parsing of ambiguous grammars
S -> if E then S else S
S -> if E then S
S -> other

=> allow `if a then if b then s1 else s2`
```
understood 2 ways:
1. if a then {if b then s1 else s2}   <-- match most recent possible then
2. if a then {if b then s1 } else s2

S -> if E then S .         (else)
S -> if E then S . else S  (any)
```

eliminate ambiguity by auxiliary non-terminals M (match statement) and U (unmatched statement)
    OR
leave grammar unchanged, tolerate shift-reduce conflict

## parser generator
YACC (yet another compiler-compiler): widely used parser generator
- instead to do by hand LR parsing for realistic grammars

yacc spec
```
parser declaration: terminal symbols, non-terminals ...
%%
grammar rules
%%
programs
```

```yacc
%{
  int yylex(void);
  void yyerror(char *s) { EM_error(EM_tokenPos, "%s", s); }
%}
% token ID WHILE BEGIN END DO IF THEN ELSE SEMI ASSIGN
% start prog
%%

prog: stmlist

stm : ID ASSIGN ID
    | WHILE ID DO stm
    | BEGIN stmlist END
    | IF ID THEN stm
    | IF ID THEN stm ELSE stm

```

yacc reports 
  shift-reduce: choice between shift and reduce
- reduce-reduce conflicts: choice of reducing by 2 different rules

## precedence directives
eg. *,/ bind more tightly than +,-

if minus is non-associative, then must force to write (a-b)-c OR a-(b-c) for a-b-c
write precedence directives in Yacc
```
%nonassoc EQ NEQ
%left PLUS MINUS
%left TIMES DIV
%right EXP
```
instead of using "rule has precedence of its last token"
- assign specific precedence to rule using %prec directive
- commonly used to solve unary minus problem
- eg. `-6*8 => (-6)*8`

## syntax VS semantics
x+y=z VS a&(b=c)
boolean expression cannot be added to arithmetic expression
=> reduce-reduce conflict

```
rules
E -> E & E
E -> E + E
```

`a + 5&b`
parser sees identifier a, no way of knowing whether arithmetic/boolean variable
=> defer analysis until semantic phase of compiler
=> expression syntatically legal, later phase reject it


# Abstract syntax















