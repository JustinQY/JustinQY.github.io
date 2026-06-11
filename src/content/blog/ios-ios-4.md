---
title: iOS面试题记录
description: iOS客户端开发工程师面试题记录 Objective-C 语言特性： 1.面向对象中的封装, 继承, 多态分别是什么? 体现在哪些地方? 是怎么使用的? 2.动态类型（id类型）是什么? 在OC中是怎么使用的? 为什么需要使用id类型? 它和其他的类型有什么区别吗? 3.动态绑定（关键词@selector）是什么? 在OC中是如何使用的? 为什么需要使用动态
date: '2024-10-16T17:57:53.000Z'
draft: false
heroImage: /images/blog/network.jpg
showHeroImage: true
tags:
  - iOS
  - Interviews
categories:
  - iOS
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

iOS客户端开发工程师面试题记录~~

Objective-C 语言特性：1.面向对象中的封装, 继承, 多态分别是什么? 体现在哪些地方? 是怎么使用的? 2.动态类型（id类型）是什么? 在OC中是怎么使用的? 为什么需要使用id类型? 它和其他的类型有什么区别吗? 3.动态绑定（关键词@selector）是什么? 在OC中是如何使用的? 为什么需要使用动态绑定? 它的原理是什么? 4.动态加载：OC中有没有动态加载? 是如何使用的? 5.内存管理: OC中对于栈和堆是如何使用的? 他们之间有什么区别? 什么时候会使用栈, 什么时候会使用堆?

设计模式: 1.单例模式是什么? 它有哪些优缺点? 单例和静态变量有什么区别？单例是线程安全的吗？
3.LRU缓存是什么? OC中需要使用到LRU缓存吗? 它是怎么实现的?
4.OC中的读写锁是什么? 一般使用在哪些场景? 具体是如何使用的? 5.开闭原则是指什么? OC中如何使用开闭原则?

iOS:
1.Runloop都有哪些mode？分别是怎么使用的?
2.runtime的category中实现了跟他一样的一个方法会怎么样？
3.KVO实现的原理是什么? 什么情况下使用KVO会导致崩溃?
4.autoreleasepool实现原理是什么?
5.Swift和OC有哪些明显的差异?
6.SDWebImage是什么? 什么时候需要使用到SDWebImage? 有哪些值得学习的SDWebImage的源码? 7.图片解码的过程是怎样的? 8.指针混淆是什么?
9.TagPointer是什么?
10.NSString为什么用copy修饰? 11.页面路由如何实现? 如何维护一张路由表? 页面是如何进行跳转的? 路由表中的键和值分别是什么？如何根据服务器下发的数据加载页面? 12.重写isEqual方法，hash方法的作用是什么? (NSSet)
13.performselector和直接调用方法哪个执行速度快? 14.为什么一个线程只能有一个runloop? 15.子线程的runloop开启后，如果不做任何操作，线程会被杀死吗?
16.load方法是在什么时候调用的?
17.initialize方法是干嘛用的？是什么时候调用的?
18.repeated的NSTimer有哪些性能问题?
19.js和OC如何互相调用?
20.GCD和NSOperation的区别有哪些? 哪一个的复用性更好? NSOperation的队列可以cancel吗? 里面的任务可以cancel吗?
21.block和self是如何形成循环引用的?
22.SDWebImage的缓存策略是什么? 是如何从缓存中hit一张图片的；使用了几级缓存；缓存如何满了如何处理，是否要设置过期时间? 24.讲讲iOS动画，比如CoreAnimation? 25.屏幕上点击一个View，事件是如何去响应的? 26.深拷贝与浅拷贝是什么? 27.属性有哪些修饰符? 28.将一个NSArray赋值给一个copy修饰的NSMutableArray属性，然后尝试向这个可变数组添加对象，会发生什么?
30.Extention可以有多个吗？
31.Category多个同名方法怎么进行Method swizzing?
32.GCD串行队列和并行队列执行顺序分析?
33.NSOperator执行顺序分析，maxConcurrent为2或者1两种情况?
34.KVO的实现原理，一个类的多次kvo会生成多个新类吗？是直接就对所有的属性都生成新的setter和getter方法吗?
37.autoreleasepool原理是什么？如果对一个对象写了多次autorelease，会怎样?
38.weak table是用什么数据结构实现的?
39.block有哪几种内存类型? 是如何捕获变量的?
40.copy和mutableCopy是什么? 他们之间有什么区别?
41.@synchronized() 是什么? 它是做什么的? 它的实现原理是什么?
42.atomic的实现原理是什么?
43.Power()函数是什么?
44.block存在的价值是什么? 它和delegate的区别是什么?
45.\_block变量实现原理是什么?
47.iOS下载文件下载到一半crash了, 有没有办法等用户回来后再继续下载?
48.UIbutton在不改变view大小的情况下扩大点击区域怎么做?
49.runtime时添加方法怎么做?
