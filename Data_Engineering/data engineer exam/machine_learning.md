# how it works
train model with examples (input + label)
separate test and training data ensure model generalized for additional data

## supervised learning
regression
- predict stock price, student test socre
- continuous value

classification
- yes/no, decision tree
- categorical value

# unsupervised learning
clustering: finding patterns
- not labeled / categorized
- heavily tied to statistics

reinforcement learning
- postive/negative reinforcement to complete task

# neural network
composed of layers, consists of neurons
bias: value of output given weight of 0
feature: input variable used to make predictions
hidden layer: set of neurons operating from same input set
learning rate: rate of adjustments
hyperparameter: variables abouts training process itself

feature engineering: decide which feature to use in model
gradient descent: technique to minimize loss

## overfitting
unable to generalize with new data
### cause
- not enough training data
- too many features, too complex
- fitted to unnecessary features unique to training data (noise)

### solution
- add more training data with variety
- make model less complex
- combine multiple redundant features in single feature
- remove noise: increase regulatization parameters

## regularization
add penalty when model become more complex
cut out noise and unimportatn data

L1, Lasso regression: 
- greater importance to more influential features
- some features more important

L2, Ridge regression: 
better when all features influence output all weights roughtly equal size

## wide vs deep network
wide: memorization
deep: generalization

gcloud ml-engine local train

# role
## data scientist / ML engineer
use ML library
create, train, adjust ML models
get into ML details

## application developer
enable ML capabilities into app, plug and play solution

# ML options
## AI platform
train, deploy, manage custom ML models on managed infrastruccture

## pre-trained models
common use case

# AI platform
master: manage other nodes
workers: works on portion of training job
parameter server: coordinate shared model state between workers

## get prediction
online: 
- high rate request with minimal latency
- json request, predictions returned as response msg

batch
- prediction on huge data in shortest time
- input and output in cloud storage

## terms
model: individual solutions to a problem, can deploy many versions
version: instance of model
Job
- train model
- deploy trained models
- failed jobs monitored, troubleshoot

## IAM
Project and model:
admin: full control
developer: create job, models, request prediction
viewed: read only

model: owner, user

## using cloud
BigQuery, Cloud Storage


# TPU
tensor processing unit, more optimized for ML than GPU

# Pre-trained ML API
label detection
text detection (OCR)
safe search
landmark detection
image properties
web detection

## bigquery ML
use sql syntax to create models

# Vertex AI
## auto ML
pre-trained api for custom models
supply own data to train on

## custom training
complete control over training process

## model garden
discover, test, customize and deploy vertex AI

## generative AI
access Google's large generative AI models for multiple media (text,code,image,speech)

## bigquery user
BigQuery ML only support batch predictions 
MLOps automate monitoring and maintain accuracy of predictions over time

# FAQ
- best qualify tranining data min 10 training odcs per label, ideally 100 times more docs for most common label
- machine type: master, worker, parameter server
- use smaller set of features to avoid overfitting



