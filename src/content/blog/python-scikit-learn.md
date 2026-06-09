---
title: Scikit Learn Implementation
description: 记录scikit learn库的使用 Logistic Regression --- Loading Dataset Split the train/test set Fit the Model Make Predictions Evaluate Accuracy
date: '2024-07-12T15:30:45.000Z'
draft: false
heroImage: /images/blog/pythonlanguage.jpg
showHeroImage: true
tags:
  - Python
categories:
  - Python
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

记录scikit learn库的使用~~~



## Logistic Regression

---

### Loading Dataset
```python
import numpy as np

X = np.array([[0.5, 1.5], [1,1], [1.5, 0.5], [3, 0.5], [2, 2], [1, 2.5]])
y = np.array([0, 0, 0, 1, 1, 1])
```

### Split the train/test set
```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)

```

### Fit the Model
```python
from sklearn.linear_model import LogisticRegression

lr_model = LogisticRegression()
lr_model.fit(X, y)
```

### Make Predictions
```python
y_pred = lr_model.predict(X)

print("Prediction on training set:", y_pred)
```

### Evaluate Accuracy
```python
print("Accuracy on training set:", lr_model.score(X, y))
```
