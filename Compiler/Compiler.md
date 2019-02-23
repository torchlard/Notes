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

































