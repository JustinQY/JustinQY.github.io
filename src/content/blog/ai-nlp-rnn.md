---
title: Recurrent Neural Network (RNN)
description: Sequence Models and RNN Why use sequence models? Sequence models are used to situations when you have sequential input (e.g. images fo a human action, a paragraph of text or empty)
date: '2025-02-06T10:05:06.000Z'
draft: false
heroImage: /images/blog/chatgpt.jpg
showHeroImage: true
tags:
  - RNN
  - NLP
categories:
  - NLP
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Sequence Models and RNN

# Why use sequence models?

Sequence models are used to situations when you have sequential input (e.g. images fo a human action, a paragraph of text or empty) or when you want to generate sequential output (e.g. music, a proper sentiment).

# Data Represents

## Input x

In sequential models, each element is represented by $x^{\(i\)\<t\>}$, $\(i\)$ means the $i_{th}$ training example and $\<t\>$ means the $t_{th}$ element in this example. Use $T_x^{\(i\)}$ to denote the length of $i_{th}$ training example.

## Input y

$y^{\(i\)\<t\>}$ means the $t_{th}$ element of the $i_{th}$ output example. Use $T_y^{\(i\)}$ to denote the length of $i_{th}$ output.

# RNN

## Why not a standard network?

There are some problems using standard networks:

- The dimension of input and output can be different in different examples
- Don't **share features** learned across different positions of text.

> Compared to CNN, it has the similar purpose: share the features and reduce parameters.

While dealing with current input element $x^{\<t\>}$, combine the information (activation value) of **last time step** $a^{\<t-1\>}$.

> Passing activation values $a^{\<0\>},\ a^{\<1\>},\ ...\ a^{\<t\>}$ through neural network.
> The parameters used for each time step are **shared**. $W_{ax}$ used for $x^{\<t\>}$, $W_{aa}$ used for $a^{\<t\>}$ and $W_{ya}$ used for $\hat{y}^{\<t\>}$

### Simplified RNN

$a^{\<t\>} = g(W_{a}\[a^{\<t-1\>}, x^{\<t\>}\] + b_a),\ W_a\ is\ horizontal\ stack\ of\ W_{aa}\ and\ W_{ax}$
$\hat{y}^{\<t\>} = g(W_{y}a^{\<t\>} + b_y),\ W_y\ is\ also\ called\ W_{ya}$

> $W_{aa}$: second $a$ means it's multiplied by a-like quantity and first $a$ means it's used to compute a-like quantity.
> $W_{ax}$: second $x$ means it's multiplied by x-like quantity and first $a$ means it's used to compute a-like quantity.
> $W_{ya}$: second $a$ means it's multiplied by a-like quantity and first $y$ means it's used to compute y-like quantity.

### Pros and Cons

- When predict a output $\hat{y}^{\<3\>}$, it not only uses information from $x^{\<3\>}$, but also the information from $x^{\<1\>}$ and $x^{\<2\>}$.
- It can't use information later than current position in the sequence. (Solve with Bidirectional RNN, BRNN)

## Backpropagation through Time

Like forward propagation going from left to right and passing information, backpropagation goes from right to left (goes back through time steps).

## Types of RNNs (RNN Building Blocks)

### 'Many to Many' Architecture

#### Name Entity Recognition

Each time step of RNN will generate a output $\hat{y}^{\<t\>}$, which means $T_x == T_y$

#### Machine Translation

The RNN first inputs the original text (text in French), then outputs the translated text (text in English). Btw, $T_x$ and $T_y$ may be different.

> Encoder and Decoder: the input part of the RNN is called 'Encoder' while the output part is called 'Decoder'.

### 'Many to One' Architecture

Like Sentiment Classification.

### 'One to Many' Architecture

Like music generation or sequence generation, current element of output $\hat{y}^{\<t\>}$ will be feed to the next time step with the input element $x^{\<t+1\>}$.

### 'One to One' Architecture

Standard generic neural network, doesn't need a RNN.

## Language Model with RNN

Language model is something like machine translation and speech recognition. It's going to output content that is likely to happen.

To build a language model with RNN:

- Training set: large corpus of text
- Tokenize the sentence and form your vocabulary: mapping each word by using methods like one-hot. (can use `<EOS>` token represents sentence ending)
  > If any word isn't in the vocabulary, use token `<UNK>` to replace it. ("UNK" means unknown)
- Build RNN model: At the very beginning of RNN, calculate the probability of the first word (e.g. "cat") using softmax. Then with feeding the activation $a^{\<1\>}$ to next time step, calculate **the probability of the second word given the first word** "cat" (which is $P(second\ word|cat)$). Then keep going until reach the last word/period/`<EOS>`. (RNN learns to predict one word at a time from left to right)

## Train a RNN language model

### Backpropagation through time

## Gradient Vanishing and Exploding

### Exploding Problem

Easier one to solve. We can use **gradient clipping** to fix exploding problems.

### Vanishing Problem

#### GRU (Gated Recurrent Unit)

#### LSTM (Long-Short Term Memory)

## Bidirectional RNNs

A pretty common choice for a lot of NLP problems (e.g. Name Entity Recognition): Bidirectional RNN + LSTM blocks.

> Disadvantages: BRNNs need the entire sentences to handle, bad at tasks like speech recognition or real time speech recognition.
