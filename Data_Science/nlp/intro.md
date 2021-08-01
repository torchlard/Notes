# tokenization
split sentense into separate words

nltk.tokenize.WordPunctTokenizer

eg. This is Andres's text

# token normalization
want same token for different forms of word

wolf, wolves -> wolf
talk, talks -> talk

## stemming
remove and replace suffixes to get root form of word

## lemmatization
returns base of word

## porter's stemmer
nltk.stem.PorterStemmer

sses -> ss
ies -> i
ss -> ss
s -> 

## further normalization
Us,us -> us

eta,e.t.a.,E.T.A. -> E.T.A.

# n gram
1-gram for token
2-grams for token pairs

good movie -> good movie: 1, movie: 1, did not: 0
did not like -> good movie: 0, movie: 0, did not: 1

## remove n-grams
high frequency n-grams
- articles, prepositions
- called stop-words, won't help to discriminate texts

low frequency n-grams
- typos, rare n-grams
- don't need them, if not likely overfit

medium frequency n-grams
- good n-grams

idea: n-gram with smaller freq more discriminating


# TF-IDF
term frequency (tf)


binary: 0,1
raw count: f(t,d)
log normalization: 1+log(f(t,d))

tf (term frequency) = f(t,d)/sum(f(t',d))
idf(t,D) = log[(D - num_docs in corpus) / num_doc term t appears]

high weight: high term frequency in given document 
  with low doc freq in whole collection of doc

tf-idf(t) = tf(t,d) x idf(t)

## better BOW
replace counters with TF-IDF
normalize result row-wise (divide by L2-norm)







