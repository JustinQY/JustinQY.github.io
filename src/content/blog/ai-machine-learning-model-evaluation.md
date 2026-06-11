---
title: Model Evaluation
description: 'Evaluate a model and decide what to do next. Model Evaluation Train Test Split Split the dataset to: 70% for training and 30% for testing. --- Train/test Procedure for Linear Regre'
date: '2025-01-17T18:26:21.000Z'
draft: false
heroImage: /images/blog/teslacharging.jpg
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

Evaluate a model and decide what to do next.

# Model Evaluation

## Train Test Split

Split the dataset to: 70% for training and 30% for testing.

---

### Train/test Procedure for Linear Regression

Fit params by minimizing const function J _(contains regularization term)_

$$
J(\mathbf{w},b) = \frac{1}{2m_{train}} \sum\limits_{i = 1}^{m_{train}} (f_{\mathbf{w},b}(\mathbf{x}^{(i)}) - y^{(i)})^2  + \frac{\lambda}{2m_{train}}  \sum_{j=1}^{n} w_j^2
$$

Compute Test Error:

$$
J_{test}(\mathbf{w},b) = \frac{1}{2m_{test}} \sum\limits_{i = 1}^{m_{test}} (f_{\mathbf{w},b}(\mathbf{x_{test}}^{(i)}) - {y_{test}}^{(i)})^2
$$

Compute Train Error:

$$
J_{train}(\mathbf{w},b) = \frac{1}{2m_{train}} \sum\limits_{i = 1}^{m_{train}} (f_{\mathbf{w},b}(\mathbf{x_{train}}^{(i)}) - {y_{train}}^{(i)})^2
$$

> $J_{train}(\mathbf{w},b)$ will be low, and $J_{test}(\mathbf{w},b)$ will be high.

---

### Train/test Procedure for Logistic Regression

Fit params by minimizing const function J _(contains regularization term)_

$$
J(\vec{w},b) = -\frac{1}{m_{train}} \sum\limits_{i = 1}^{m_{train}} [y^{(i)}\log(f_{\vec{w}, b}(\vec{x}^{(i)})) + (1 - y^{(i)})\log(1 - f_{\vec{w}, b}(\vec{x}^{(i)}))] + \frac{\lambda}{2m_{train}}\sum_{j=1}^{n} w_j^2
$$

Compute Test Error:

$$
J_{text}(\vec{w},b) = -\frac{1}{m_{test}} \sum\limits_{i = 1}^{m_{test}} [y_{test}^{(i)} \log(f_{\vec{w}, b}(\vec{x_{test}}^{(i)})) + (1 - y_{test}^{(i)})\log(1 - f_{\vec{w}, b}(\vec{x}_{test}^{(i)}))]
$$

Compute Train Error:

$$
J_{train}(\vec{w},b) = -\frac{1}{m_{train}} \sum\limits_{i = 1}^{m_{train}} [y_{train}^{(i)}\log(f_{\vec{w}, b}(\vec{x_{train}}^{(i)})) + (1 - y_{train}^{(i)})\log(1 - f_{\vec{w}, b}(\vec{x}_{train}^{(i)}))]
$$

> Common Method for train and test error in classification model:
> $J_{test}(\vec{w}, b)$ is the **fraction** of the test set that has been **misclassified**.
> $J_{train}(\vec{w}, b)$ is the **fraction** of the train set that has been **misclassified**.

---

# Model Selection

## Train Cross-Validation Test Split

Split dataset into 60% for training, 20% for cross-validation and 20% for testing.

## Evaluate and Choose

Train all models on the training set.

Evaluate all models on cross-validation set and pick the best one.

Then give a fair estimate value of accuracy of the chosen model using test set.
