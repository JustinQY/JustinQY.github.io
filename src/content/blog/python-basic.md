---
title: Python Basic
description: 'Python basic knowledge 列表创建 1. 创建一个 一维 空列表, 长度为0 2. 创建一个 二维 空列表, 行和列长度为 n 列表的几种遍历方式: 1. 从0到nums列表最后一位顺序遍历法, i表示下标 ( nums[0], nums[1]...nums[n-1] ) 2. 遍历由 [left, right] 左右闭区间组成的nums'
date: '2024-07-03T15:49:26.000Z'
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

Python basic knowledge~~

## 列表创建

1. 创建一个**一维**空列表, 长度为0

```python
nums = []
```

2. 创建一个**二维**空列表, 行和列长度为**n**

```python
nums = [[None for _ in range(n)] for _ in range(n)]
```

## 列表的几种遍历方式:

1. 从0到nums列表最后一位顺序遍历法, i表示下标 (`nums[0], nums[1]...nums[n-1]`)

```python
for i in range(len(nums))
```

2. 遍历由`[left, right]`左右闭区间组成的nums子串, x表示这个区间的每一个nums元素

```python
for x in nums[left:right]
```

3. 从`left`下标开始, 到`right-1`结束, 以`step`为**步长**, 遍历这个区间. i表示下标

```python
for i in range(left, right, step)

# 注意: 遍历区间是**左闭右开**区间, 即`[left, right)`.
# 如果需要左右闭区间遍历, 则需要: `range(left, right + 1, step)`
# 反向闭区间遍历: `range(left - 1, right, step)`
```

4. 从`left`下标开始, 到`right-1`结束, 以`step`为**步长**, 遍历这个区间. i表示下标

```python
for i in range(left, right, step)
```

5. 列表获取子区间

```python
[x for x in nums[left:right]]

[nums[i] for i in range(left, right, step)]
```

## 列表添加元素

1. 添加单个元素到列表尾部, 如`nums.append(x)`

```python
append()
```

2. 添加一个可迭代对象（如列表、元组、字符串等）的所有元素到列表尾部, 如`nums.extend([4, 5, 6])`

```python
extend()
```

## 'for' loops

### for循环遍历时的参数设置
