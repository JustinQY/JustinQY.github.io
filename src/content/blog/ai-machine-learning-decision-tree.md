---
title: Decision Tree
description: Definition, implementation and pros and cons of decision tree models. What is a decision tree? A decision tree is a simple model for 'supervised' classification/regression. Each in
date: '2025-04-11T00:35:42.000Z'
draft: false
heroImage: /images/blog/cheese.jpg
showHeroImage: true
tags:
  - ML
  - Machine Learning
categories:
  - Machine Learning
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Definition, implementation and pros and cons of decision tree models.



## What is a decision tree?
A decision tree is a simple model for 'supervised' classification/regression.
> Each internal node performs a Boolean test on an input feature.
> Each leaf node specifies a value for the target feature.


## How to select features(attributes) in decision tree models?
### ID3 (iterative dichotomizer 3 迭代二分器)
ID3 split attributes based on their 'entropy'. Used for 'classification' tasks.
> 'Entropy' is minimized when all values of the target attribute are the same.
> 'Entropy' is maximized when there is an equal chance of all values for the target attribute.

#### Information Gain (信息增益)
Difference between uncertainty of the starting node and weighted impurity of the two child nodes.
> Information Gain = Entropy(parent) - \[Average entropy(children)\]
> Each time, choose the maximal IG attribute as the internal node.

#### Pros and Cons
> Only need to test enough attributes, but may be overfitted on small dataset
> Classifying continuous data may be computationally expensive

### CART (Classification and Regression Trees)
Split nodes using 'Gini Impurity' for classification and 'MSE' for regression.

### C4.5
Used for classification. Split nodes using 'Gain Ratio', which normalizes Information Gain to address its bias toward attributes with many values.
Handles continuous attributes by dynamically creating threshold splits.

## Parameters in Decision Trees
### Meta-Parameters
Parameters are not set by the user; they are learned from the training data.

### Hyper-Parameters
1. Depth
2. Sample to form a leaf node
3. Criteria to split on (entropy/ gini/MSE)

## Decision Boundary
1. The decision boundaries in decision trees are lines parallel to coordinate axis.
2. Each split of a node will contribute a new line to decision boundaries.
