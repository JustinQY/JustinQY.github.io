---
title: Word Embeddings
description: Words to vector, catch word meanings by word embeddings. Representing words One-Hot Encoding Choose a vocabulary, each word in your sample is represented by a one-hot vector (shape
date: '2025-04-20T17:27:28.000Z'
draft: false
showHeroImage: false
tags:
  - Embedding
  - NLP
categories:
  - NLP
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Words to vector, catch word meanings by word embeddings.


## Representing words
### One-Hot Encoding
Choose a vocabulary, each word in your sample is represented by a one-hot vector (shape: (vocab_size, )).
> If any words are not in the vocab, use '<UNK>' token to represent it.
