---
title: 数据竞争
description: 多线程数据竞争demo 数据竞争代码举例以及用互斥锁解决
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

多线程数据竞争demo~~~

#### 数据竞争代码举例以及用互斥锁解决

```objective-c
// ViewController.m
//售票员卖票demo

@interface ViewController()

@property(nonatomic, strong) NSThread *threadA;
@property(nonatomic, strong) NSThread *threadB;
@property(nonatomic, strong) NSThread *threadC;

@end

@implementation ViewController

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {

    self.ticketCount = 100;
    //开启三个售票员线程
    self.threadA = [[NSThread alloc] initWithTarget:self selector:@selector(saleTicket) object:nil];
    self.threadB = [[NSThread alloc] initWithTarget:self selector:@selector(saleTicket) object:nil];
    self.threadC = [[NSThread alloc] initWithTarget:self selector:@selector(saleTicket) object:nil];

    //线程属性设置
    self.threadA.name = @"售票员A";
    self.threadB.name = @"售票员B";
    self.threadC.name = @"售票员C";

    //启动线程
    [self.threadA start];
    [self.threadB start];
    [self.threadC start];

}

- (void)saleTicket {
    while(1) {
        @synchronized (self) {
            //对于每一次卖票的模块上锁，保证同一时间只有一位售票员在卖票
            if(self.ticketCount > 0) {
                //卖出去一张票
                for(int i = 1; i <= 100000; i++); //增加程序执行时间，方便观察结果
                NSLog(@"%@卖出去一张，还剩下%zd张", [NSThread currentThread].name, self.ticketCount - 1);
                self.ticketCount--;
            } else {
                NSLog(@"票已售罄");
                break;
            }
        }
    }
}

@end
```
