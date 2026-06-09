---
title: Face Recognition
description: 1. How to solve face recognition problem with one-shot learning, which uses Siamese Network and Triplet loss function. 2. Face verification problem with binary classification, intr
date: '2025-01-11T20:49:50.000Z'
draft: false
heroImage: /images/blog/face_recognition_1.jpeg
showHeroImage: true
tags:
  - Computer Vision
  - CV
categories:
  - CV
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

1. How to solve face recognition problem with one-shot learning, which uses Siamese Network and Triplet loss function. 
2. Face verification problem with binary classification, introduce logistic unit and chi-square norm. 


---

# Face Verification
* 1:1 problem
* Input: image, name/ID of a certain person 
* Output: if input image is that specific person

# Face Recognition
* 1:K problem
* Input: image 
* Output: if input image is one of the K persons / not recognized

Note: _face verification_ model can be used to _face recognition_ problem unless it has a very _high accuracy_. 

> if the former has 1% chance to make a mistake, then it will be K% chance while in recognition task.

## One-Shot Learning
Learning from 1 example to recognize the person again. For normal CNN, we don't have that much image data. And every time add a new person to system, we don't want to train the network again. 

### Learn a similarity function 'd'
d(img1, img2) = **difference** between img1 and img2
* d(img1, img2) ≤ τ: img1 and img2 are $same$ person
* d(img1, img2) > τ: img1 and img2 are $different$ person

### Siamese Network
Instead of using the 'softmax' output layer as a classifier learned before, we use a 'fully-connected' layer deeper in the network. The vector of this FC layer is called 'encoding of input image1', which is $f(image1)$. The difference between img1 and img2 is presented by 'Euclidean Distance', which is 
$ 
d(\mathbf{f(img1)}, \mathbf{f(img2)}) = \sqrt{\sum_{i=1}^n (f(img1)_i - f(img2)_i)^2} 
$

#### **Goal of Learning Siamese Network**
1. Params of network represent the encoding of $ f(img_i) $
2. Learn params so that:
   * If $img_i$, $img_j$ are 'same' person, $d(img_i, img_j)$ is _small_ ;
   * If $img_i$, $img_j$ are 'different' person, $d(img_i, img_j)$ is _large_.

### **Triplet Loss Function**
Triplet: should always watch 3 images: Anchor, Positive (same person with anchor) and Negative (different person with anchor)

Target: difference between d(A, P) and d(A, N) is greater or equal to a _margin_ (-α), which is: 

$d(A, P) + α - d(A, N) ≤ 0$

Loss Function: $L(A, P, N) = max(d(A, P) + α - d(A, N), 0)$

Cost Function: $J = \sum_{i=1}^n (L(A, P, N))$

#### **Paper**
FaceNet: A unified embedding for face recognition and clustering.

### **Face Verification and Binary Classification**
Previous: Use 'Triplet' loss function to train the params in ConvNet

Binary Classification: 
1. Take two images ($ x^i, x^j $) from _new input_ and _database_, separately into the Siamese Network 
2. Embed their encodings ($ f(x^i), f(x^j) $) into a logistic regression unit
3. Make a prediction. (1: same person, 0: different person)

#### **Procedure of Logistic Unit**
$
\begin{aligned}
\hat{y} = \text{sigmoid}\left(\sum_{k=1}^n w_k \cdot \left|{f(x^i)}_k - {f(x^j)}_k\right| + b\right),\ n = num\ of\ features\ in\ encoding
\end{aligned}
$

where
$
\left|{f(x^i)}_k - {f(x^j)}_k\right| = \frac{ \left({f(x^i)}_k - {f(x^j)}_k \right)^2 }{ {f(x^i)}_k + {f(x^j)}_k }
$, which is called 'chi square norm'

#### **Pre-Compute the encodings for Database Image**
Pre-compute the encodings for all database images, when a new image comes,

we can just compute its encoding and embed it with the pre-computed encodings to make a prediction

> Not only used in binary face verification, but also in triplet loss function.

#### **Paper**
DeepFace closing the gap to human level performance.
