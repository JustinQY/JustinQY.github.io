---
title: 观察者模式
description: 观察者模式记录 什么是观察者模式 --- 1. 观察者模式定义：观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象。这个主题对象在状态上发生变化时，会通知所有观察者对象，使它们能够自动更新自己。 2. iOS中实现观察者模式：Notification、KVO。 Notification -- 通知 --- 现有对象A和B，A对B的变
date: '2024-07-05T02:40:47.000Z'
draft: false
heroImage: /images/blog/icecream.jpg
showHeroImage: true
tags:
  - iOS
  - 设计模式
categories:
  - iOS
  - 设计模式
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

观察者模式记录~~~


### 什么是观察者模式

---

1.  观察者模式定义：观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象。这个主题对象在状态上发生变化时，会通知所有观察者对象，使它们能够自动更新自己。
2.  iOS中实现观察者模式：Notification、KVO。

### Notification -- 通知

---

现有对象A和B，A对B的变化感兴趣，就注册为B的观察者，当B发生变化时通知A，告知B发生了变化。

* 对于感兴趣的A来说，在A这里定义通知，也就是注册观察者（A就是观察者，定义怎么观察的以及观察到了会做些什么）

```objective-c
//注册观察者
[[NSNotificationCenter defaultCenter] addObserver:self 
     							         selector:@selector(notice:) 				 										 name:@"tongzhi" 
     									   object:nil];
    
//观察到变化后做什么事情
- (void)notice:(id)sender {
    NSLog(@"%@", sender);
}
```

* 对于变化源B来说，在B这里发出通知

```objective-c
//创建通知对象
//Name是通知的名称   object是通知的发布者，也就是发布通知的对象   userInfo是一些额外的信息， 字典类
NSNotification *notification = [NSNotification notificationWithName:@"tongzhi"
                                   							 object:nil
                                   						   userInfo:nil];
    
//发送通知
[[NSNotificationCenter defaultCenter] postNotification:notification];
```
  
* 在dealloc中移除观察者
```objective-c
- (void)dealloc {
  //根据name和object删除对应的观察者，如果object设置为nil，则删除所有name匹配的观察者
  [[NSNotificationCenter defaultCenter] removeObserver:self name:@"tongzhi" object:nil];
}
```

### KVO -- Key Value Observing

---

KVO，即键值观察，它是观察着模式的一种衍生。其基本思想是，对目标对象的**某属性**添加观察，当该属性发生变化时，会**自动通知**观察者。相比于NotificationCenter的post通知来说简单了许多。

* 首先，给目标对象的属性添加观察
```objective-c
- (void)addObserver:self
    forKeyPath:@"name"
    options:NSKeyValueObservingOptionNew|NSKeyValueObservingOptionOld //能够记录旧值和新值
    context:nil
```

* 其次，实现下面方法来接收通知（当被观察的属性发生变化时，观察者立马会得到通知）
```
- (void)observeValueForKeyPath:(nullable NSString *)keyPath  //目标属性，需判断是否和自己所观察的属性一致
    ofObject:(nullable id)object           //目标对象，需判断是否和自己所观察的对象一致
    change:(nullable NSDictionary<NSString*, id> *)change
    context:nil

//如果收到的通知经过判断不是自己要观察的，则将该情况交给父类处理，因为父类也有可能使用了KVO
//[super observeValueForKeyPath:keyPath
    				   ofObject:object
    				     change:change
    				     context:context];
```

* 最后，移除观察者
```objective-c
- (void)removeObserver:self forKeyPath:@“name”;
```


### KVO的原理

---

当某个类的对象第一次被观察时，系统就会在运行期动态地创建该类的一个派生类，在这个派生类中重写基类中被观察属性的 setter 方法，在setter方法里使其具有通知机制。同时派生类还重写了 class 方法以“欺骗”外部调用者它就是起初的那个类。然后系统将这个对象的 isa 指针指向这个新诞生的派生类，因此这个对象就成为该派生类的对象了，因而在该对象上对 setter 的调用就会调用重写的 setter，从而激活键值通知机制。此外，派生类还重写了 dealloc 方法来释放资源。

* 在重写的`setter`里，给属性赋值的前后分别调用了两个方法：
```objective-c
- (void)willChangeValueForKey:(NSString *)key;  //赋值前
- (void)didChangeValueForKey:(NSString *)key;   //赋值后
```

* 在`didChangeValueForKey:(NSString *)key`方法中会调用：
```objective-c
- (void)observeValueForKeyPath:(nullable NSString *)keyPath
				      ofObject:(nullable id)object          
			  			change:(nullable NSDictionary<NSString*, id> *)change
					   context:nil
```


### KVO使用注意

---

* 只有使用属性的setter方法，或通过key-path来设置属性值，观察者对象才会获得通知
```objective-c
常见的几种设置方式：

1.遵循使用属性的setter方法
self.name = @"changed";
[self setName:@"changed"];

2.通过key-path设置
[self setValue:[NSString stringWithFormat:@"changed"] forKey:@"name"];
```

* 观察者在使用结束后一定要在dealloc中移除，否则会导致资源泄漏

* 通知方法（observeValueForKeyPath）中，change字典保存了属性变更的信息
```objective-c
NSLog(@"the old value is %@", [change objectForKey:@"old"]);  //旧值
NSLog(@"the new value is %@", [change objectForKey:@"new"]);  //新值
```
