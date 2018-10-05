# clustering
## k-means
finding k points as mean of k groups of data

## k-modes
what if data is non-numerical? 
k-means rely on math calc (mean, euclidian distance)
k-modes = extension of k-means

use dissimilarities (total mismatch between two objects) and modes
mode = vector of elements minimize dissimilarities

## k-prototypes
combine k-means and k-modes for numerical and categorical data

## guassian mixture model
conventional :
single gaussian mixture: can only use 1 average value vector to represent many values, effect not good
vector quantization: use multiple important position to represent whole vector space, but not showing distribution size & shape

guassian mixture: use multiple guassian distribution, better representation

## DBSCAN (Density-based spatial clustering of applications with noise)
definitions :
core point = at least m points within distance e
non-core point = < m points within distance e, but reachable from core points
outlier = not reachable from any other point

connectedness = the extend of clusters found by DBSCAN
cluster has 2 properties:
1. all points within cluster mutually density-connected
2. point is density-reachable => part of cluster

adv
- can find non-linearly separable clusters, cannot be adequately clustered with k-means / Guassian Mixture EM clustering
- find arbitrary shaped cluster
- robust to outliers

## hierarchical clustering
combine or divide dataset into clusters iteratively => tree-like hierarchical structure created
- agglomerative (bottom-up, start from tree leaves, combine 2 nearest clusters )
- divisive (top-down, start from root of tree and select cluster to split at each iteration)


# Dimension reduction
## Principal component analysis
orthogonal transformation that convert 
  set of observation of possibly correlated variables -> 
  set of linearly uncorrelated variables (principal components)

(n observations, p variables) => #principal component = min(n-1, p)
1st principal component(PC) = largest variance (getting most variability)
2nd PC = highest variance possible under 1st PC
...
=> orthogonal basis set

usage:
- visualize genetic distance and relatedness between populations
- simplest true eigenvector-based multivariate analyses
- get lower-dimensional picture, projection with most informative viewpoint

## Singular value decomposition
M = m x n real/complex matrix
U = m x r real/complex unitary matrix, where U*U = UU* =I
E = r x r rectangular diagonal matrix, non-negative real num on diagonal, sort in descending order
V = n x r real/complex unitary matrix

M = U E V*

r suppose to be a smaller number
eg. 
U = (m documents, r concepts)
E = rxr (strength of each concept) [r = rank of matrix M]
V = (n terms, r concepts)

M = e1*u1*v1^T + e2*u2*v2^T + ...  (ei = scalar)

- always possible to decompose M into unique U,E,V
for M = User-to-Movies matrix,
U = user-to-concept similarity matrix
E = strength of XX-concept
V = movie-to-concept similarity matrix

## theory
when dimensionality of data increases, volume of space increase quicker
=> data become more and more sparse

to do statistical modelling, need increse data points 
covariance = measure of joint variability of two random variable, greater value, more similar behavior
covariance matrix = matrix of convariance of elements in i,j position of random vector

PCA algorithm:
1. subtract mean, scale dimensions by variance
2. compute covariance matrix

covariance matrix is expensive to compute when dimension is large => use SVD instead
for E = r x r, reduce dimension number from m -> r, then obtain r-dimensional hyper-plane, value of E gives you amount of variance retained by this reduction
- eg. 1st PC get 37% of variance, next quickly drops
- better to find PCs that explain 80-90% variance of data

eg. reduce 64x64px image (4096 dimensions) to 50 engenvectors (50 D)

## latent Dirichlet allocation
allow set of observations to be explained by unobserved groups that explain why some parts of data are similar

### early time document model
#### TF-IDF
TF: find how frequent keywords exist in document
IDF: how many document contains this keyword

assume there's N documents, M words => build M*N matrix
row = 1 document, column = tf-idf value of word in this document

disadv: fail to compress document info a lot, fail to extract info between words and documents

#### LSI
SVD on tf-idf matrix (U(Mxr)*E(rxr)*V(rxN) ), r << N
r = #topic, U = word-topic relation,  
E = topic itself, V = topic-document relation

adv: compress word list a lot, better discover synonym

#### Unigram
word extract from single multimodal distribution
#### mixture of unigram
introduce hidden variable Z, chosen Z, p(w|z) generate N words
#### pLSI
1 document can have multiple topic, get weighted average of multiple topics
disadv: poor generalization, fail to test on document with too many unknown words
- bag-of-words assumption
1. all N words' order doesn't matter
2. document order not matter























