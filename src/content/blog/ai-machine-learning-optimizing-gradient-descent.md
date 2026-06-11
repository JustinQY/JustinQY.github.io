---
title: Optimization for Gradient Descent and Learning Algorithm
description: Notions about gradient descent. Optimizing Learning Algorithm --- Feature Engineering (特征工程) Use intuition to create new features, by combining and transforming the original ones.
date: '2025-01-16T21:18:33.000Z'
draft: false
heroImage: /images/blog/pythonnotebook.jpg
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

Notions about gradient descent.

# **Optimizing Learning Algorithm**

---

## Feature Engineering (特征工程)

Use intuition to create new features, by combining and transforming the original ones.

### Polynomial Regression

Use not only $x$, but also $x^2, x^3, \sqrt{x}$ etc.

# Initialization Weights

Improper initialization may lead to problems of gradient vanishing/explosion, slow converging or stucking in local minimum.

## Zero Initialization (全零初始化)

Set all W = 0, b = 0.

> Can't be used in neural networks --> all neurons calculate the same gradients, which means they learn the same information from training and can't converge.
> Suitable for bias, not for weights.

## Random Initialization (随机初始化)

Set W and b with small random values.

> Suitable for small neural networks, but not deep neural networks.
> When random value is too small, cause gradient vanishing.
> When random value is too big, cause gradient explosion.

## Xavier Initialization (Xavier初始化)

Make the variance of input and output be the same, to avoid gradient vanishing or explosion.

> Suitable for neural networks using Sigmoid or Tanh, but not ReLU
> Suitable for deep neural networks.

## He Initialization (Kaiming He初始化)

> Suitable for ReLU, Leaky ReLU or Parametic ReLU,
> Suitable for deep neural networks like CNN, ResNet.

# Gradient Descent Convergence

---

## **Plot a "Learning Curve" graph**

Plot a graph of cost function _J_ after each iteration _(after gradient descent)_ on the y-axis and times of iteration on the x-axis.

Watch if the **learning curve** is **decreasing** after every iteration.

> J ever increased: $\alpha$ is too large or any bugs

## Automatic Convergence Test with $\epsilon$

Let $\epsilon$ be $10^{-3}$.

If J decreases by $\leq \epsilon$ in one iteration, **convergence**!

> Disadvantage: $\epsilon$ is hard to choose

# Choose the Learning Rate

Try a series numbers:

1. from $\alpha$ = 0.001, plot the _learning curve_ graph.
2. multiple $\alpha$ by three (e.g., 0.001 -> 0.003 -> 0.01 -> 0.03), repeat step 1 to find a suitable $\alpha$.

<br/>

# Feature Scaling (特征缩放)

---

When we face the problem of multidimensional features, we need to ensure that these features have similar ranges, which will help the gradient descent algorithm converge faster.

One way to do this is called "Feature Scaling".

## 1. Mean Normalization (均值标准化)

$$
x_i := \frac{x_i - \mu_i}{\text{max} - \text{min}}
$$

$\mu_i$ refers to the **mean** of all the values for feature (i)

## 2. Z-score Normalization

$$
x_j^{(i)} = \frac{x_j^{(i)} - \mu_j}{\sigma_j}
$$

µ𝑗 (miu) is the **mean** of all the values for feature (j).

𝜎𝑗 (sigma) is the **standard deviation** of feature (j), which is calculated by $𝜎 = \sqrt{\frac{\sum_{i=1}^N (x_i - µ)^2}{N}}$

<br/>

# **Overfitting and Regularization (过拟合和正则化)**

## **Overfitting**

Make too many efforts (use polynomial patterns) to train the model under training dateset will cost "overfitting", which means the model could do well in training dataset, but no good in new dataset.

---

### **High Bias and High Variance**

High bias (underfit): model doesn't fit **training set** well.

High Variance (overfit): model fits **training set** extermely well, but seems won't generalize to **new data well**.

---

## **Reduce Overfitting**

1. Collect more training data.
2. Try to avoid using so many **polynomial features**.
3. Select features to include / exclude (feature selection): useful features could be lost
   > all features + insufficient data -> overfit
4. Regularization

---

## **Regularization**

To fix overfitting, we use a technique called "regularization".

Regularization **encourages gradient descent to minimize the size of the parameters**, which avoid the polynomial features to make an overly large effect.

regularization term:

$$
\frac{\lambda}{2m}\sum_{j=0}^{n-1} w_j^2,\ \lambda \ is \ regularization parameter
$$

> The parameter b will usually not be regularized.

---

### Choose good values for $\lambda$

---

### **Regularization for Linear Regression**

$$
J(\mathbf{w},b) = \frac{1}{2m} \sum\limits_{i = 0}^{m-1} (f_{\mathbf{w},b}(\mathbf{x}^{(i)}) - y^{(i)})^2  + \frac{\lambda}{2m}  \sum_{j=0}^{n-1} w_j^2 \tag{1}
$$

where:

$$
f_{\mathbf{w},b}(\mathbf{x}^{(i)}) = \mathbf{w} \cdot \mathbf{x}^{(i)} + b  \tag{2}
$$

---

### **Regularization for Logistic Regression**

$$
J(\mathbf{w},b) = \frac{1}{m}  \sum_{i=0}^{m-1} \left[ -y^{(i)} \log\left(f_{\mathbf{w},b}\left( \mathbf{x}^{(i)} \right) \right) - \left( 1 - y^{(i)}\right) \log \left( 1 - f_{\mathbf{w},b}\left( \mathbf{x}^{(i)} \right) \right) \right] + \frac{\lambda}{2m}  \sum_{j=0}^{n-1} w_j^2 \tag{3}
$$

where:

$$
f_{\mathbf{w},b}(\mathbf{x}^{(i)}) = sigmoid(\mathbf{w} \cdot \mathbf{x}^{(i)} + b)  \tag{4}
$$
