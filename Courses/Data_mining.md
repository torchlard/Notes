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
attribute are categorical / discrete set of continuous-valued
selected on basis of heuristic(啟發法) / statistical measure
- stop partitioning:
all samples for given node belong to same class
no remaining attribute for further partitioning
no samples left

### attribute selection measure
#### information gain
attributes assumed to be categorical (can modify to continuous)

p elements in class P, n elements in class N
I(p,n) = -p/(p+n)*log(p/(p+n)) - n/(p+n)*log(n/(p+n))

entropy of p_i of P and n_i of N:
E(A) = sum(v; i=1){ (p_i + n_i)/(p + n) * I(p_i, n_i) }

Gain(A) = I(p,n) - E(A)

### avoid overfit
overfit reason: curve try to reflect all anomalies 
- prepruning: halt tree construction early, don't split node cause goodness measure below threshold
- postpruning: remove branches, get sequence of progressively pruned tree
use different dataset from training data to decide which is best pruned tree

cross validation (eg. 10-fold cross validation)
use minimum description length

#### Gini index
attibutes are continuous-valued
several possible split values for each attribute
may need other tools (eg. clustering) to split value

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


















