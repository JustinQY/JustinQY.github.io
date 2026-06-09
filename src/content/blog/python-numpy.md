---
title: Numpy
description: Applications in numpy 1. reshape numpy array .reshape() 2. generate array from a fixed range 3. generate random values array
date: '2025-01-27T10:40:42.000Z'
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

Applications in numpy


1. reshape numpy array
   `.reshape()`
2. generate array from a fixed range
   ```python
   np.linspace(0, 1, 100) # generate 100 values from [0, 1], each two with same gap
   
   np.logspace(0, 1, 100) # generate 100 values from [10^0, 10^1], each two with same gap
   
   np.random.uniform(0, 1, 100)  # randomly sampling 100 values from [0, 1)
   ```
3. generate random values array
   ```python
   np.random.randn(n, m) # array with (n x m) random values
   ```
