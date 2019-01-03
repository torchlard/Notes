# Can't find implementation for Ord elem
add `Ord x =>`  in the type definition

reason: 
eg. maxMaybe : Ord a => Maybe a -> Maybe a -> Maybe a
dont't know what type Maybe contains

suppose you have sth defined like
```
data RB : Type -> Type where
  E : Ord a => RB a
  Tree : Ord a => Color -> (RB a) -> a -> (RB a) -> RB a
```
since Ord is not explicityly defined, when you define some funciton like
`Empty => "E"`
you need
`showing : Num a => Tree a -> String`


# cannot show result of function, only show sth like "balanceRR (...)" in REPL
reason: some error with function balanceRR, so it cannot execute







