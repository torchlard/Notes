# Association rule mining
find pattern, association, corelation
usage:
- association, causality analysis
- sequential pattern
- pattern analysis
- classification
- cluster analysis
- data warehousing (iceberg cube)
objective: find all rules that correlate 1 set of items with another set

## support and confidence
find all rules X => Z with min confidence and support
- support: P(X & Z)
  statistical significant
- confidence: P(Z|X)
  rule's strength

## variation
1. Boolean vs quantitative
buys(x,"SQLServer") ^ buys(x, "DMBook") => buys(x, "PC")[1%, 75%]
age(x, "30..39") ^ income(x, "42.48K") => ...
2. single vs multiple dimension
3. single vs multiple level
4. various extensions

## Apriori principle
any subset of frequent item set must be frequent

## Algorithm
1. apply apriori principle, iteratively find frequent itemsets with carinality from 1->k
2. use itesets found, repeat previous step
3. if R satisfies min confidence, then R is strong association rule => output

L3 = {2,3,5} -> {2},{3},{5},{2,3},{2,5},{3,5}

## improve Apriori's efficiency
1. hash based itemset counting
2. filter transaction not having frequent itemset
3. itemset at least frequent in 1 partition of DB
4. Sampling: mine on subset of data
5. add new iteset only when all subset frequent

## other measuers: Interest
lift ratio = Interest() = P(A^B) / [P(A)P(B)]
for A => B


# Sequential ARM 
## goal
mine sequential association rules
computing frequent sequences
data consist of `<s1, s2, ... ,sn>` itemsets (items bought together) in time order

## steps
1. convert database to sequences 
2. pick frequent itemsets
3. denote frequent itemsets as other symbols
4. find desired sequences using {ApioriAll, AprioriSome, DynamicSome}
5. find max sequences among set of frequent sequences

## pick frequent itemsets
```
sequenced itemsets => frequent => denote:
<30,90>                 => <30,90>                 => <1,5>
<(10,20),30,(40,60,70)> => <30,{40,70,(40,70)}>    => <1,{2,3,4}>
<(30,50,70)>            => <{30,70}>               => <1,3>
<30,(40,70),90>         => <30,{40,70,(40,70)},90> => <1,{2,3,4}>
<90>                    => <90>                    => <5>

for min support=25%, obtain
<30,90>, <30,(40,70)>

denote as:
(30)    -> 1
(40)    -> 2
(70)    -> 3
(40,70) -> 4
(90)    -> 5
```

## AprioriAll
L1 -> L2 -> L3 -> L4

find max seqs:
for(k=n; k>1; k--)
  forEach k-seq s_k
    delete items matching subsequences of s_k
    [so that item seqs will not overlap each other]
    get max supported seq in each k (except 1)

## generating candidate
abc
abd
acd
ace
bcd
==> 
abc + abd --> abcd / abdc(X)
acd + ace --> acde(X) / aced(X)
==> 
only {abcd} left

## forming rules
```
<1 2 3 4> => (1 -> 2,3,4), (1,2 -> 3,4), (1,2,3 -> 4)
```

## multi-level / generalised association rule
(1) milk => wheat bread
(2) 2% milk => wheat bread
- rule (1) is ancestor of rule (2), (2) is redundant

## multi-dimensional association
- single-dimension rule
buys(X, "milk") => buys(X, "bread")

- multi-dimension
age(X, "19-25") ^ occupation(X, "student") => buys(X, "coke")
age(X, "19-25") ^ buys(X, "popcorn") => buys(X, "coke")

data distribution: bynamic discretization
clustering: distance-based association

spatial association analysis: 
- intersect, overlap ...
- left_of, under ...
- close_to, within_distance ...

## how to apply association rule mining?
eg. for image data
what is a transaction? 1 image
what is an item? 1 image feature(color)
what is a customer (seq)? sequence of fashion design images 


# Classification
## definition
classification: predict categorical class labels, model based on value in class labels
prediction: model continuous valued functions (eg. predict unknown values)

model onstruciton: describe set of predetermined class
model usage: classify future / unknown objects

## supervied VS unsupervised
- supervision (classification)
training data accomapnied by labels indicating class of observations
- unsupervised (clustering)
class label unknown; given set of measurements, observations to establish classes

## data preparation
data cleaning, feature selection, data transformation

## evaluation of classification
accuracy, speed, scalability, interpretability, goodness of rule

## decision tree
tree construction: all data at root -> partition recursively
tree pruning: identify, remove branches

1 rule is created for each path from root to leaf, in form of `if-then` rule
leaf node holds class prediction

### algorithm
greedy algorithm: top-down recursive divide-and-conquer 
- each step choose largest gain, do not consider optimal global gain

attribute are categorical / discrete set of continuous-valued
selected on basis of heuristic(啟發法) / statistical measure
- stop partitioning:
all samples for given node belong to same class
no remaining attribute for further partitioning [each time only use one, do not use again?]
no samples left

### attribute selection measure
#### information gain (discrete)
attributes assumed to be categorical (can modify to continuous)

p elements in class P, n elements in class N
I(p,n) = -p/(p+n)*log(p/(p+n)) - n/(p+n)*log(n/(p+n))
- amount of information needed to decide if arbitrary example belong to P/N
- lowest when either class has 0 element, highest(1) when equal distribution

entropy of p_i of P and n_i of N:
E(A) = sum(v; i=1){ (p_i + n_i)/(p + n) * I(p_i, n_i) }
- higher purity of data less information to describe
- entropy = 0 when all data identical, entropy=1 when data half different 

Gain(A) = I(p,n) - E(A)
- encoding info gained by branching on A
- the lower entropy (more purity) after branching, the more information gain

### avoid overfit
overfit reason: curve try to reflect all anomalies 
- prepruning: halt tree construction early, don't split node cause goodness measure below threshold
- postpruning: remove branches, get sequence of progressively pruned tree
use different dataset from training data to decide which is best pruned tree

cross validation (eg. 10-fold cross validation)
use minimum description length
1. min sample for node split
2. min sample for leaf
3. max depth of tree
4. max num of terminal nodes
5. max features to consider split

#### Gini index (continuous)
attibutes are continuous-valued
several possible split values for each attribute
may need other tools (eg. clustering) to split value
- info gain can have multiple nodes VS Gini can only produce 2 branches (T/F)

gini_index = 1- sum(P(A)^2 + P(B)^2)
weighted_GI = num(A)/total*GI(A) + num(B)/total*GI(B)

choose classification with higher weighted gini index

##### CART tree
 support both regression and classification
 

### regression tree
similar: continuous outcome, ~ classification tree, many splits attempt
difference: 
- prediction = average of numerical target
- impurity = sum of squared deviation
- performance = RMSE

coefficient of variation = SD/average(x)
SDR(T,X) = S(T) - S(T,X)
=> then select attribute with largest SDR

a good if-then partition encourage higher SD in population 
  and slower SD in individual group

many classfication model have regression/prediction variant:
Decision tree -> Regression tree
Bayesian classifier -> Bayesian regressor
...



# Clustering
collection of data objects
-> high intra-class similarity, low inter-class similarity
unsupervised classification: no predefined class

application:
- spatial data analysis, eg. GIS
- detect spatial cluster
- image processing

## good clustering
result quality
- depends on similarity measure by method and implementation
clustering method quality
- ability to find hidden pattern

## quality
similarity expressed in term of distance function d(i,j)
function different for interval-scaled, boolean, categorical, ordinary variables
weights on different variables based on applications and data semantics

Minkowski distance = q_root(|x1-y1|^q + |x2-y2|^q + ... + |x_p-y_p|^q)
Manhattan distance = |x1-y1| + |x2-y2| + ... + |x_p-y_p|

## distance for binary variables
|     | 1   | 0   | sum |
|-----|-----|-----|-----|
| 1   | a   | b   | a+b |
| 0   | c   | d   | c+d |
| sum | a+c | b+d | p   |

- simple matching coefficient (invariant,symmetric bianry)
- eg. gender
d(i,j) = (b+c) / (a+b+c+d)
- Jaccard coefficient (non-invariant, asymmetric binary)
d(i,j) = (b+c) / (a+b+c)

## distance for nominal variables
1. m = num of matches, p = total num of variables
d(i,j) = (p-m) / p

2. create new binary variable for each M nominal states

## clustering methods
### partitioning
construct various partitions, evaluate them by some criteria
- density-based
- grid-based
- model-based

given particular k, partition n object 

#### k-means
1. partition object into k non-empty subsets
2. compute seed point as centroid of clusters
3. assign objects to nearest seed point
4. back to step2, stop when no new assignment

O(#iterations * #clusters * #objects)
need to specify k, unable to handle noise and outliers

#### k-modes
handle categorical values using dissimilarity measures
frequency based method to update modes of clusters

#### k-medoids
choose a point that is closest to all points

- Partitioning around medoids (PAM)
start from initial set of medoids, iteratively replace by other points
works effectively for small data sets, not large

CLARA: deal with larger data sets than PAM


## hierarchical clustering
### single-linkage clustering
grouping clusters in bottom up fashion, each step combine 2 clusters contain closest pair of element

1. group closest 2+ elements
2. recalc distance from group to other nodes (take min)
3. back to step 1, repeat


























