# install
Navigate to a suitable directory $HERE (replace appropriately) where you would like to install the library.

wget -O agda-stdlib.tar https://github.com/agda/agda-stdlib/archive/v1.0.1.tar.gz
tar -zxvf agda-stdlib.tar

[ OPTIONAL ] If using cabal then run the commands to install via cabal:
cd agda-stdlib-1.0.1
cabal install

// Register the standard library with Agda's package system by adding the following line to $HOME/.agda/libraries:
$HERE/agda-stdlib-1.0.1/standard-library.agda-lib

// [ OPTIONAL ] To use the standard library in your project $PROJECT, put a file $PROJECT.agda-lib file in the project root containing:
depend: standard-library
include: $DIRS

where $DIRS is a list of directories where Agda searches for modules, for instance . (just the project root).

// write to $HOME/.agda/defaults
standard-library


# compile
agda -c peano.agda --no-main

# background
dependent type
for C++,haskell, type-level computation are very often harder to comprehend

in agda, distinction between type and values doesn't exist

# formal verification
you can't reliably unit test against race condition, starvation or deadlock
- all these eliminated via formal methods

proof are compositional
for normal test, need to write unit test and integration test
for proofs, no need to reinvent

impossible for violation of your properties to slip through cracks 

# lib
Agda not even have numbers built in
- all implemented in library


# mixifx
declare functions where arguments can appear anywhere within a term


### 
binary relation is said to be reflexive if every value relates to itself


# time complexity
represent naturals for m+n:
zero, suc: prop to m
integers in Haskell: prop. to log(max(m,n))

naturals for m*n
zero,suc: prop. to m*n
integers in Haskell: prop. to log(m+n)



# proof ordering
reflexive: ∀n, n<=n
transitive: m<=n && n<=p => m<=p
anti-symmetric: ∀m,n, m<=n && n<=m => m=n
total: ∀m,n, either m ≤ n or n ≤ m holds

Preorder = reflexive + transitive
Partial order = reflexive + transitive + anti-symmetric
Total order = reflexive + transitive + anti-symmetric + total



















