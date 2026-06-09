---
title: Math In Machine Learning
description: Mathematics in machine learning IQR (Interquartile Range) IQR describes the distance between the 1st quartile and the 3rd quartile. It is a method to detect outliers in dataset. ou
date: '2025-01-25T17:08:03.000Z'
draft: false
heroImage: /images/blog/toolandpaper.jpg
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

Mathematics in machine learning~



## IQR (Interquartile Range)
IQR describes the distance between the 1st quartile and the 3rd quartile. It is a method to detect **outliers** in dataset. 
> outliers are data < Q1 - 1.5 * IQR, and data > Q3 + 1.5 * IQR

---

## Variance and Standard Deviation
### Variance
Variance describes how a group of data distribute from their mean. It measures the dispersion degree (离散程度).
> The more variance is, the more dispersive the data distributes.

$$
\sigma^2 = \frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2,
$$


### Standard Deviation
Standard Deviation is the square root of variance. Compared to variance, standard deviation is more helpful to compare the dispersion degree of the data.
> Standard Deviation has the same dimension as the original data.

---

## Covariance and Correlation
### Covariance
Between two groups of variables, Covariance describes when one variable changes, how will another one change. It measures the linear relationship between two variables.
$$
Covariance(x, y) = \frac{\sum_{i=1}^n (x_i - x')(y_i - y')}{n}
$$

> The value of covariance is between $-\infty$ and $+\infty$.
> When it equals to 0, it means there is no linear relationship between these two variables.

### Correlation
The correlation between two variables describes how strong the relationship between two variables.
$$
Correlation(x, y) = \frac{\sum_{i=1}^n (x_i - x')(y_i - y')}{\sqrt{\sum_{i=1}^n (x_i - x')^2 (y_i - y')^2}} = \frac{covariance(x_i, y_i)}{SD(x_i)SD(y_i)}
$$
> The value of correlation is between -1 and +1.
> Correlation is the 'scaled version' of covariance.

### Cross-Covariance

### Gram Matrix
Gram matrix is formed by vectors, each vector measures the product of two vectors.
> Can be used in neural style transfer. 
---


## Distance Matrix
Distance metrics deal with finding the proximity or distance between data points and determining if they can be clustered together.
---

### Euclidean
Represents the shortest distance between two vectors.
$$
d_{Euclidean} = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$

### Manhattan
The sum of absolute differences between points across all the dimensions.
$$
d_{Manhattan} = |x_2 - x_1| + |y_2 - y_1|
$$

### Mahalanobis
The distance between a point and a distribution.
$$
d_{Mahalanobis}^2 = (x - m)^T C^{-1} (x - m)
$$

### Hamming
A fundamental tool for measuring the dissimilarity between two pieces of data, typically strings or integers.
> For string data, $d_{Hamming}$ measures the dissimilarity by the sum of different chars.
> For numerical data, $d_{Hamming}$ measures the dissimilarity by the sum of different values between their binary forms.

## Data Distribution
### Normal Distribution (正态分布)
1. In a normal distribution, mean, median and mode are equal.
2. 68.2% values are within 1 standard deviation of 'mean', 95% values are within 2 standard deviations of 'mean' and 99% values are within 3 standard deviations of 'mean'

### Skewness (偏度)
If the values extend to the right, it is right-skewed, and if the values extend left, it is left-skewed.

## Entropy
Measure how disorder the data is. The larger entropy is, the messier the data will be.
![img.png](/images/blog/ai-machine-learning-math-in-ml/img.png)

### Calculation
$$
H = -\sum_i^n p_i\(\log_2{p_i}\)
$$

## Cross-Entropy
Measuer the gap and difference between two probability distributions.

### Calculation
$$
H(p,\ q) = -\sum_i^n p_i\(\log_2{q_i}\)
$$
