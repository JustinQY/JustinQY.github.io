---
title: pthread
description: 多线程pthread记录
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

多线程pthread记录~~~

```objective-c
// ViewController.m

#import <pthread.h>

- (void)viewDidLoad {
    [super viewDidLoad];

    //1.创建线程对象
    pthread_t thread;

    //2.线程创建函数
    //1).线程对象 -- 地址传递
    //2).线程的属性
    //3).指向函数的指针
    //4).前面函数要接收的参数 -- NULL
    pthread_create(&thread, NULL, func, NULL);

    //3.判断两条线程是否相等
    pthread_equal();
}

void *func(*void) {

    NSLog(@"%@-----", [NSThread currentThread]);
    return NULL;
}
```
