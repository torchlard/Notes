# objective
data & feature engineering determines upper bound of machine learning result, model & algorithm only approaches this limit

aim: engineering operation to extract features from raw data for model & algorithm to use

## pre-processing
not same dimension: make all dimensionless
remove redundancy: if only care pass/fail, then use 1=>pass, 0=>fail
dummy variable
fill missing value

###
Normalizer: scale by data on row
StandardScaler: scale by data on column

## feature selection
1. is feature value diverge? eg. variance ~ 0 == no use
2. feature relevance to target

### method
1. filter: set threshold
>variance:
binary: Var(x) = p(1-p)
multiple: Var(X) = sum(x^2)/N - mean(X)^2
filter whole feature with vairance < threshold

>correlation:
calc coeff value with target field
input function to calc score of pair of array

>chi2
how independent variable affect dependent variable

2. wrapper: by objective function each time select/exclude few features
>recursive feature elimination
each round delete some feature

3. embedded: do model training to get features weighting, sort descending order
>select from model
use model with penality terms, both select features and reduce dimension
L1 principle: keep multiple features that has equal correlation

>based on tree
GBDT

#### MIME (maximal infomational-based nonparametric exploration)
fast way to explore dependence for each pair of variables, rank pairs by scores
examine top-scoring pairs

2 heuristic
- generality: sufficient sample size have wide range of association (funcitons)
- equitability: similar scores to equally noisy relationship of different types

##### maximal information coefficient (MIC)
measure of bivariate dependence

MIC, other MIME stat calculated from matrix of scores -> characteristic matrix
strong relationship => high peaks in matrices
monotonic relation => symmetric matrix
complex relation => peaks far from origin

| | application | standardized | complexity | robustness|
|pearson|linear |y| low|low|
|spearman|linear,simple montonous non-linear|
kendall
distance
phase synchronous
threshold related
kernel density estimate
KNN
MIC

basic idea:
if 2 variables related, then in certain finite set D, draw grids in scatter plot, grids 
can partition points in plot. By distribution of dots in grid, we can get probabilistic distribution
and calc entropy and information coeff

by increasing resolution of grids, we get largest info coeff 

### dimension reduction
1. PCA
2. LDA















