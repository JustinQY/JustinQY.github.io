---
title: Tensorflow And Pytorch
description: Applications in tensorflow and pytorch. Tensorflow 1. transform "pandas.dataframe" to "tensorflow.dataset" For training dataset, you should set the "label" to be the prediction lab
date: '2025-01-27T10:41:37.000Z'
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

Applications in tensorflow and pytorch.


## Tensorflow
1. transform "pandas.dataframe" to "tensorflow.dataset"
> For training dataset, you should set the "label" to be the prediction label. In the "Titanic Survivors Prediction", the label should be set to “Survived”.
```python
# tfdf: tensorflow_decision_forests

train_ds = tfdf.keras.pd_dataframe_to_tf_dataset(pandans_train_dataframe, label="Survived")
test_ds = tfdf.keras.pd_dataframe_to_tf_dataset(pandans_test_dataframe)
```

---

## PyTorch
1. flatten (扁平化)
   `torch.flatten(tensor)`

---
