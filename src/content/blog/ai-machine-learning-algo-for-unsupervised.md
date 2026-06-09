---
title: Unsupervised Learning Algorithms
description: 'Algorithms for unsupervised learning Clustering Practical application in clustering: 1. Grouping similar news 2. Market segmentation 3. DNA analysis K-means Algorithm ''The K-means'
date: '2025-05-26T15:43:18.000Z'
draft: false
showHeroImage: false
tags: []
categories: []
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Algorithms for unsupervised learning~


## Clustering
Practical application in clustering:
1. Grouping similar news
2. Market segmentation
3. DNA analysis

### K-means Algorithm
'The K-means algorithm is a method to automatically cluster similar data points together.'

K-means do these **2** things repeatedly:
1. Assign points to cluster centroids(聚类中心)
   a. First, make random guesses of cluster centroids;
   b. Go through all examples and check which cluster centroid the example is closer to;
   c. Assign each point to its closest centroid.
2. Move cluster centroids
   a. Take an average of examples for each cluster, move the centroid to this 'average' location; 
   b. Go through all examples again to reassign them to the closest cluster centroid;
   c. Repeat step 1 and 2 until there isn't a reassignment occurred, which means the K-means algorithm 'converged.'

### Mathematics Notation of K-means
1. Randomly initialize `K` cluster centroids, $\mu_1, \mu_2,...\mu_k$. ($\mu$ has the same dimension as training examples $X$).
2. Calculate distance between all training examples and cluster centroids. (Using $||x^{(i)} - \mu_k||^2$, which is 'L2 Norm').
3. The fact of K-means algorithm is actually minimizing the cost function J, which is also called **the Distortion Function**:
> $c^{(i)}$ = index of cluster (1, 2, ..., K) to which example $x^{(i)}$ is currently assigned
> $\mu_k$ = cluster centroid $k$
> $\mu_{c^{(i)}}$ = cluster centroid of cluster to which example $x^{(i)}$ has been assigned
> K-means algorithm tries to find cluster centroids that could minimize the distance.
> $$ J(c^{(1)}, ..., c^{(m)},\mu_1,...,\mu_K ) = \frac{1}{m} \sum_{i=1}^{m} ||x^{(i)} - \mu_{c^{(i)}}||^2 $$

### Initialize K-means
1. How do we actually implement random guess of cluster centroids?
> choose `K` (num of clusters) less than training examples `m`
> randomly pick `K` training examples to become the cluster centroids
> run K-means multiple times to try to avoid local minima (compare the cost function `J` between all tries)

2. Pseudocode
```python
# Random Initialization

For i = 1 to 100 {
   Randomly initialize K-means by picking k random examples.
   Run K-means. Get c1, ..., cm, µ1, ..., µk
   Compute Cost Function (distortion) J(c1, ..., cm, µ1, ..., µk)
}

Pick set of clusters that gave lowest cost
```

### Choose the number of clusters `K`
#### Elbow Method
Enumerate num of `K` from 1, and plot between `Cost Function J` and num of `K`. If the curve looks like 'elbow', choose the 'elbow point' value. 

#### Don't use `K` to just minimize `Cost Function`
Because this will lead to always choosing the maximum number of `K`.

#### Evaluate K-means based on how well it performs on the later purpose


### Problem of K-means
1. How to define the num of clusters?
2. If there isn't any example in a cluster after assignment, eliminate this cluster. 

### Anomaly Detection
Anomaly detection is a procedure that finds unusual events.

### Normal Distribution

### Density estimation
1. Training set: ${X}$
2. Each example $x^{(i)}$ has $n$ features
3. Density Estimation: $$p^{(x)} = p(x_1, \mu_1, \sigma_1^2) * p(x_2, \mu_2, \sigma_2^2) * ··· * p(x_n, \mu_n, \sigma_n^2)$$

### Anomaly Detection Algorithm
1. Choose $n$ features $x_i$ that you think might be indicative of anomalous examples.
2. Fit parameters $\mu_1,\mu_2,...,\mu_n, \sigma_1^2,\sigma_2^2,...,\sigma_n^2$.
3. Given new example $x$, compute **density estimation** $p(x)$.
4. Anomaly if $p(x) < \epsilon$.

### Evaluating Anomaly Detection System
It's usually much easier to make decisions if we have a way of evaluating the learning algorithm.

Assume we have some labeled data, of anomalous(y = 1) and non-anomalous(y = 0) examples.

Training set: $x^{(i)}, x^{(2)},... ,x^{(m)}$ (assume normal examples/not anomalous)
> y = 0 for all training examples

Cross Validation set: $(x_{cv}^{(1)}, y_{cv}^{(1)}), (x_{cv}^{(2)}, y_{cv}^{(2)}),...,(x_{cv}^{(m_(cv)}, y_{cv}^{(m_(cv))})$

Test set: $(x_{test}^{(1)}, y_{test}^{(1)}), (x_{test}^{(2)}, y_{test}^{(2)}),...,(x_{test}^{(m_(test)}, y_{test}^{(m_(test))})$
> mostly examples are normal(y = 1), but a few examples are anomalous(y = 1)

Fit model $p(x)$ on the training set, then on a cross validation/test set example $x$, predict 
$$
y = 1, if\ p(x) < \sigma(anomaly)
$$
$$
y = 0, if\ p(x) >= \sigma(normal)
$$

> Evaluation metrics: 
> * True positive, false positive, false negative, false positive
> * Precision/Recall
> * F1-score

### Anomaly Detection v.s. Supervised Learning
When to use anomaly detection, and when to use supervised learning?
* Anomaly Detection: **very small** number of positive examples (y = 1) and **large number** of negative (y = 0) examples
> Situation: 
>> Many different 'types' of anomalies, hard for any algorithm to learn **from existing positive examples** what the **new anomalies** look like.
>> Future anomalies may **look nothing like** any of the anomalous examples we've seen so far. 
* Supervised Learning: **large number** of positive and negative examples.
> Situation:
>> Enough positive examples for algorithm to get a sense of what positive examples are like
>> future positive examples likely to be **similar** to ones in the training set.

### Feature Selection in Anomaly Detection System
#### Non-gaussian features
For features that are non-gaussian, use methods below to transform them to be more 'gaussian'.
1. $x_1 -> log(x_1)$
2. $x_2 -> log(x_2 + c)$
3. $x_3 -> \sqrt{(x_3)}$
4. $x_4 -> x_4^{\frac{1}{3}}$

### Error Analysis for Anomaly Detection System
Most common problem:
$p(x)$ is comparable for both normal and anomalous examples.
> Solution:
>> Look at the examples that anomaly detection system failed to detect, and try to create new features that will allow the algorithm to spot. (How can I detect it as a human?)


## Recommender System

## Reinforcement Learning

##
