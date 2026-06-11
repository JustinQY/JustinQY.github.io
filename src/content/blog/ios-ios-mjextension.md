---
title: iOS MJExtension
description: MJExtension MJExtension -- Json转Model 一. Json数据 定义： JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。JSON采用完全独立于语言的文本格式，这些特性使JSON成为理想的数据交换语言。易于人阅读和编写，同时也易于机器解析和生成。 ----- Json可以将js对象中
date: '2024-07-04T04:00:00.000Z'
draft: false
showHeroImage: false
tags:
  - iOS
  - 第三方库
categories:
  - iOS
  - 第三方库
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

MJExtension

### MJExtension -- Json转Model

#### 一. Json数据

##### 定义：

JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。JSON采用完全独立于语言的文本格式，这些特性使JSON成为理想的数据交换语言。易于人阅读和编写，同时也易于机器解析和生成。 ----- Json可以将js对象中表示的一组数据转换为字符串，然后就可以在函数之间传递这个字符串，且js很容易解析它。

##### 基础结构：

1.  “名称/值”对的集合（A collection of name/value pairs）。不同的语言中，它被理解为对象（object），记录（record），结构（struct），字典（dictionary），哈希表（hash table），有键列表（keyed list），或者关联数组 （associative array）。

2.  值的有序列表（An ordered list of values）。在大部分语言中，它被理解为数组（array）。

##### 实例：

1.  名称/值

    {"firstName":"Mary", "lastName":"Frank", "email":"gmail"}

2.  表示数组

    { "people": [

    { "firstName": "Brett", "lastName":"McLaughlin", "email": "aaaa" },

    { "firstName": "Jason", "lastName":"Hunter", "email": "bbbb"},

    { "firstName": "Elliotte", "lastName":"Harold", "email": "cccc" }

    ]}

##### 特点：

1.  Json是完全动态的，允许在Json结构中改变表示数据的方式

#### 二. MJExtension的使用
