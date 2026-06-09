---
title: 单例模式
description: 单例模式记录 单例模式提供了一种创建对象的最佳方式。这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。 单例模式的作用 --- 保证在程序运行过程中，一个类只有一个实例，该实例易于供外界访问，从而方便地控制了实例个数，节约系统资源 单例模式的使用场合 --- 在整个应用程序中，需要共享一份资源（资源只需要初始化一次） 单例模式的
date: '2024-07-05T02:40:47.000Z'
draft: false
heroImage: /images/blog/onehole.jpg
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

单例模式记录~~~


单例模式提供了一种创建对象的最佳方式。这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。

### 单例模式的作用

---

保证在程序运行过程中，一个类只有一个实例，该实例易于供外界访问，从而方便地控制了实例个数，节约系统资源


### 单例模式的使用场合

---

在整个应用程序中，需要共享一份资源（资源只需要初始化一次）


### 单例模式的实现

---

1. ARC环境下实现单例模式
```objective-c
方法：懒加载，类方法，协议实现

//ToolBox.m

#import "ToolBox.h"

@interface ToolBox() <NSCopying, NSMutableCopying>
@end

@implementation ToolBox
//0.提供全局变量
static ToolBox *toolBox;

//懒加载 --- 保证只分配一次存储空间
//alloc -> allocWithZone
+ (instancetype)allocWithZone:(struct _NSZone *)zone {
    //线程安全问题
    //1.互斥锁
//    @synchronized (self) {
//        if(toolBox == nil) {
//            toolBox = [super allocWithZone:zone];
//        }
//    }
    
    //2.GCD一次性代码 -- 程序运行期间只执行一次
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        toolBox = [super allocWithZone:zone];
    });
    
    return toolBox;
}
    
//类方法
//1.方便访问 -- 外界只需调用类方法获得该类实例
//2.表明身份 -- 从类方法识别该类是单例
//3.命名规范 -- share+类名|default+类名|share|default|类名
+(instancetype)shareTool {
    return [[self alloc] init];
}

//协议实现
//copy -> copyWithZone
- (id)copyWithZone:(NSZone *)zone {
    return toolBox;
}

//mutableCopy -> mutableCopyWithZone
- (id)mutableCopyWithZone:(NSZone *)zone {
	return toolBox;
}

@end
```

```objective-c
//ViewController.m

#import "ViewController.h"
#import "ToolBox.h"

@implementation ViewController

//ARC环境下实现单例模式

- (void)viewDidLoad {
    [super viewDidLoad];
    
    //1.懒加载实现
    ToolBox *tool1 = [[ToolBox alloc] init];
    ToolBox *tool2 = [[ToolBox alloc] init];
    ToolBox *tool3 = [ToolBox new];
    
    //2.类方法实现
    ToolBox *tool4 = [ToolBox shareTool];
    
    //3.实现协议中的copy方法，将已有的toolBox对象返回即可
    ToolBox *tool5 = [tool1 copy];
    ToolBox *tool6 = [tool1 mutableCopy];
    
    NSLog(@"t1:%p   t2:%p    t3:%p    t4:%p    t5:%p    t6:%p", tool1, tool2, tool3, tool4, tool5, tool6);
}

@end
```
