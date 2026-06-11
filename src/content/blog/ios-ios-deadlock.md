---
title: 死锁
description: '多线程死锁理解笔记(乱) 使用disptach sync在串行队列(包括主队列)导致的死锁问题原理解释:'
date: '2024-07-04T04:00:00.000Z'
draft: false
showHeroImage: false
tags:
  - iOS
  - Multithreading
categories:
  - iOS
  - Multithreading
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

多线程死锁理解笔记(乱)~~~

使用disptach_sync在串行队列(包括主队列)导致的死锁问题原理解释:

![deadlock](/images/blog/deadlockdiy.jpg)
