---
title: Recommender System
description: 'Algorithms for Recommender Systems Collaborative Filtering Algorithm (协同过滤) --- Building Recommender System with per-item features For example, each movie has 2 features: $x 1$ is'
date: '2025-05-28T16:28:48.000Z'
draft: false
showHeroImage: false
tags: []
categories: []
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Algorithms for Recommender Systems~

## Collaborative Filtering Algorithm (协同过滤)

---

### Building Recommender System with **per-item features**

For example, each movie has 2 features: $x_1$ is 'romance' and $x_2$ is 'action'.

Each user will have a 'rating' for each movie.

For user `j`, we can predict rating for movie `i` as: $ w^{(j)} · x^{(i)} + b^{(j)} $, just like linear regression.

#### Cost function for this system

> $w^{(j)}, b^{(j)}$: params for user `j`.
> $x^{(i)}$: feature vector for item `i`.
> $r(i, j) = 1$: if user `j` rated item `i`.
> $y^{(i, j)}$: item `i`'s rating given by user `j`.
> $m^{(j)}$: num of items rated by user `j`.
> $n_u$: num of users
> $n_m$: num of items

For single user `j` and item `i`, predict rating: $ w^{(j)} · x^{(i)} + b^{(j)} $.

To learn $w^{(j)}, b^{(j)}$ for user `j`:

$$
J(w^{(j)}, b^{(j)}) = \frac{1}{2} \sum_{i:r(i,j)=1} (w^{(j)} · x^{(i)} + b^{(j)} - y^{(i, j)})^2 + \frac{\lambda}{2} \sum_{k=1}^{n} (w_k^{(j)})^2
$$

> Note:
>
> - Added L2 Norm to prevent overfitting.
> - Set $\frac{1}{2m^{(m)}}$ to be $\frac{1}{2}$ for convenience.

To learn $(w^{(1)}, b^{(1)}), (w^{(2)}, b^{(2)}),..., (w^{(n_u)}, b^{(n_u)})$ for all users:

$$
J(w^{(1)},..w^{(n_u)}, b^{(1)},..,b^{(n_u)}) = \frac{1}{2} \sum_{j=1}^{n_u} \sum_{i:r(i,j)=1} (w^{(j)} · x^{(i)} + b^{(j)} - y^{(i, j)})^2 + \frac{\lambda}{2} \sum_{j=1}^{n_u} \sum_{k=1}^{n} (w_k^{(j)})^2
$$

---

### Build Recommender System **without feature values (with learned user features)**

For example, we got parameters $w$ and $b$ of users and their ratings for all items (might miss some ratings).

The model we defined as above: $ w^{(j)} · x^{(i)} + b^{(j)} $, now we know $y_{rating} \approx w^{(j)} · x^{(i)} + b^{(j)}$.

We could guess the feature values of items ($x^{(i)}$) by putting $\ w, b\ and\ y\ $into the function.

#### Cost function for this system

To learn $x^{(i)}$:

$$
J(x^{(i)}) = \frac{1}{2} \sum_{j:r(i, j)=1} (w^{(j)} · x^{(i)} + b^{(j)} - y^{(i, j)})^2 + \frac{\lambda}{2} \sum_{k=1}^{n} (x_{k}^{(i)})^2
$$

To learn $x^{(1)}, x^{(2)},..., x^{(n_m)}$:

$$
J(x^{(1)}, x^{(2)},...,x^{(n_m)}) = \frac{1}{2} \sum_{i=1}^{n_m} \sum_{j:r(i, j)=1} (w^{(j)} · x^{(i)} + b^{(j)} - y^{(i, j)})^2 + \frac{\lambda}{2} \sum_{i=1}^{n_m} \sum_{k=1}^{n} (x_{k}^{(i)})^2
$$

---

### Collaborative Filtering

If we put the two **cost functions** together:

$$
J(w^{(1)}..w^{(n_u)}, b^{(1)}..b^{(n_u)}, x^{(1)}..x^{(n_m)}) = \frac{1}{2} \sum_{(i, j):r(i,j)=1} (w^{(j)} · x^{(i)} + b^{(j)} - y^{(i, j)})^2 + \frac{\lambda}{2} \sum_{j=1}^{n_u} \sum_{k=1}^{n} (w_k^{(j)})^2 + \frac{\lambda}{2} \sum_{i=1}^{n_m} \sum_{k=1}^{n} (x_{k}^{(i)})^2
$$

> Note:
>
> > Collaborative Filtering is gathering data from multiple users and help predict (ratings of items) for other users.

---

### Generalize to Binary Labels

Instead of giving integer values of rating to items, the users now gave '1/0' binary values to items.

> 1: Usually means user $j$ like/click/purchase/spend at least 30 secs on an item after being shown.
> 0: Usually means user $j$ didn't engage after the item being shown.
> ?: Means the item isn't shown to the user $j$ yet.

#### From **regression** to **binary classification**

Previously:

> Predict $y^{(i, j)}$ as $ w^{(j)} · x^{(i)} + b^{(j)} $
>
> > $f(w, b, x) = w^{(j)} · x^{(i)} + b^{(j)}$

For binary classification:

> Predict the **probability** of $y^{(i, j)}\ =\ 1$, which is given by $ g(w^{(j)} · x^{(i)} + b^{(j)}) $, where $g(z)$ is sigmoid function.
>
> > $f(w, b, x) = g(w^{(j)} · x^{(i)} + b^{(j)})$

Loss Function:

$$
L(f_{(w, b, x)}, y^{(i, j)}) = -y^{(i, j)} \log(f_{(w, b, x)}) - (1 - y^{(i, j)}) \log(1 - f_{(w, b, x)})
$$

Cost Function:

$$
J(w, b, x) = \sum_{(i, j): r(i, j)=1} L(f_{(w, b, x)}, y^{(i, j)})
$$

---

### Mean Normalization

Mean Normalization will make the collaborative filtering algorithm perform more efficiently and accurately.

> For example, for a user $k$ who didn't rate any items. According to the cost function, after training the model, the $w, b$ of user $k$ will be 0. Because user $k$ didn't rate any item and made no contributions to the term $ w^{(j)} · x^{(i)} + b^{(j)} $. The L2 Norm term will penalize $w^{(k)}, b^{(k)}$ to zero.
>
> > In this case, we can't use the model to predict useful ratings for users who haven't rated any items yet.

#### Calculate vector **$\mu$**

Vector **$\mu$** stands for mean values of each item based on all users' ratings.

Subtract the original item-user matrix by vector **$\mu$** to generate a new item-user matrix.

For user $j$, on item $i$, predict:

> $ w^{(j)} · x^{(i)} + b^{(j)} + \mu_i$, here we add $\mu_i$ back to prevent negative ratings.

---

### Collaborative Filtering in Tensorflow

Auto Diff (Tensorflow/PyTorch)

---

## Find Related Items

In fact, the features $x^{(i)}$ of item $i$ are quite hard to interpret.

To find other items **related** to it, we could find item $k$ with $x^{(k)} similar to $x^{(i)}$.

To calculate the similarity, we use $|| x_l^{(k)} - x_l^{(i)} ||^2$ distance.

$$
|| x_l^{(k)} - x_l^{(i)} ||^2 = \sum_{l=1}^{n} (x_l^{(k)} - x_l^{(i)})^2
$$

---

### Limitations of Collaborative Filtering

- Cold Start Problem
  - rank new items that few users have rated?
  - show sth reasonable to new users who have rated few items? (Mean Norm helps, but not much)

- Use side information about items or users
  - Item: Genre, movie stars, studio...
  - User: Demographics (age, gender, location), expressed, preferences, ip, web browser...

---

### Summary

The goal of collaborative filtering recommender system is to generate two vectors:

- for each user, a '**parameter** vector' that embodies the item taste of a user, which is $W$;
- for each item, a '**feature** vector' that embodies some description of an item, which is $X$;

> Note: these two vectors are the same size.

---

## Content-based Collaborative Filtering Algorithm

Compare **Collaborative Filtering** and **Content-Based Filtering**:

- Collaborative Filtering: Recommend items to you based on **ratings of users** who gave similar ratings as you.
- Content-Based Filtering: Recommend items to you based on **features of user and item** to find a good match.

### Learn to match

We have features for users and items:

- $x_{user}^{(j)}$: features for user $j$
- $x_{item}^{(j)}$: features for item $j$

Calculate two vectors:

- user $j$'s preferences: $v_u^{(j)}$,
