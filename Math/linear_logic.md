# BNF notation (Backus-Naur form / Backus normal form)
notation technique for context-free grammars
variants: extented BNF, augmented BNF


# substructural logic
logic lacking one of usual structural rules 
(eg. weakening, contraction, exchange, associativity)

## structural rule
inference rule that doesn't refer to any logical connective (symbol connecting multiple sentences)

```
weakening: hypotheses/conclusion of sequent extended with additional member
Γ ⊢ Σ       Γ ⊢ Σ 
-------  , -------
Γ,A ⊢ Σ    Γ ⊢ Σ,A

contraction: two equal members on same side can be replaced by single member
Γ,A,A ⊢ Σ    Γ ⊢ A,A,Σ 
---------  , ---------
Γ,A ⊢ Σ       Γ ⊢ A,Σ

Exchange: 2 members on same side maybe swapped
Γ1,A,Γ2,B,Γ3 ⊢ Σ    Γ ⊢ Σ1,A,Σ2,B,Σ3
----------------  , ----------------
Γ1,B,Γ2,A,Γ3 ⊢ Σ    Γ ⊢ Σ1,B,Σ2,A,Σ3

```

# introduction
substructural logic as refinement of classical and intuitionistic logic















