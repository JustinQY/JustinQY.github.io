---
title: Useful Plots in ML
description: Some types of plots and how can they be helpful for machine learning tasks, such as feature selection. Data exploration During data exploration, we can use plots below to find more
date: '2025-02-09T15:15:55.000Z'
draft: false
heroImage: /images/blog/desk.jpg
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

Some types of plots and how can they be helpful for machine learning tasks, such as feature selection.


## Data exploration
During data exploration, we can use plots below to find more information and relationship not only among different features, but also between features and target. 

---

### Histogram
Shows the distribution of feature.
* If it's normal distribution, it can be used to model training directly.
* If it's left skewed, may have to take square root.
* If it's right skewed, may have to be transformed under `log`.

> Watch whether the feature is normal distribution, or left/right skewed? If skewed, use **normalization** to fix it.
> Find outliers, skewed or long-tailed distribution.

### Scatter Plots
Shows relationship (**linear** or **non-linear**) between two **numerical** features (commonly feature and target).
* It may have a positive/negative correlation between this feature and target.
* If scatters distribute irregularly, means this feature effects a little to the target.

> Watch tendency, correlation and outlier through scatter plots.

### Box Plots
Detects the outliers.
* Up/down whiskers (上下须) represents the range of feature distribution.
* Box represents the IQR, which is 25%-75% feature distribution.
* Discrete point shows the outliers.


## Feature Engineering
During feature engineering, we can use heatmap to find correlations between features.

---
### Heatmap
Shows the correlation between features.
* Close to +1 means strong positive correlated.
* Close to -1 means strong negative correlated.
* Close to 0 means not correlated.

> Watch correlations among all features.
> If correlation between A and B is high, means they have very similar information.
> If correlation between A and Target is high, means A is helpful to train the model.
> If correlation between A and Target is negative high (-0.8), means it's also helpful to train. You can create a new feature C which equals negative A to make the correlation positive and help the model understand better.
