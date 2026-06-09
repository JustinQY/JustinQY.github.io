---
title: gcd
description: '多线程之gcd记录 GCD (grand central dispatch) 概念 gcd是一个强大的中枢调度器, 基于C语言实现, 解决多核的并行运算，能够自动利用更多的CPU内核，自动管理线程的生命周期. 任务: 执行什么操作(可以理解为函数的内容) 队列: 用来存放、安排任务. 不同的队列类型有不同的执行任务的策略.(串行队列在当前线程按顺序执行任务,'
date: '2024-07-04T04:00:00.000Z'
draft: false
showHeroImage: false
tags:
  - iOS
  - 多线程
categories:
  - iOS
  - 多线程
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

多线程之gcd记录~~~


## GCD (grand central dispatch)

#### 概念

gcd是一个强大的中枢调度器, 基于C语言实现, 解决多核的并行运算，能够自动利用更多的CPU内核，自动管理线程的生命周期. 

* 任务: 执行什么操作(可以理解为函数的内容)
* 队列: 用来存放、安排任务. 不同的队列类型有不同的执行任务的策略.(串行队列在当前线程按顺序执行任务, 并发队列创建多个线程并行地执行任务)

#### gcd的使用逻辑

定制任务, 将任务添加到队列 -- 先进先出地自动取出任务放到对应线程中执行

#### 同步和异步

同步和异步是指任务的类型

* 同步执行: 只能在**当前线程**执行任务，**不能**开启新线程
```objective-c
//使用block块封装任务
dispatch_sync(dispatch_queue_t  _Nonnull queue, ^{
        
});
//使用函数封装任务
dispatch_sync_f(dispatch_queue_t queue, void * context, dispatch_function_t work);//队列 - 函数形参(没有为null) - 调用函数名
```

* 异步执行: ***可以***开启新线程, 并在新线程中执行任务
```objective-c
//使用block块封装任务
dispatch_async(dispatch_queue_t  _Nonnull queue, ^{
        
});
//使用函数封装任务
dispatch_async_f(dispatch_queue_t queue, void * context, dispatch_function_t work); //队列 - 函数形参(没有为null) - 调用函数名
```

#### 串行和并发

串行和并发是指队列中任务的执行策略

* 并发队列 (Dispatch Concurrent Queue): 可以让多个**任务并发执行** (自动开启多个线程同时执行任务) -- 并发功能只在异步函数下生效
```objective-c
//并发队列
/*
参数1：C语言字符串 -- 队列标签
参数2：队列类型   DISPATCH_QUEUE_CONCURRENT -- 并发
*/
dispatch_queue_t queue = dispatch_queue_create("label1", DISPATCH_QUEUE_CONCURRENT);

```

* 全局并发队列: 默认存在，且对应有高，默认，低，后台优先级的四种并发队列，使用时只选择其中一个；而create函数是从0开始创建一个并发队列
```objective-c
//全局并发队列
/*
参数1：队列优先级
参数2：默认为0
*/
dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0);
```

* 串行队列 (Dispatch Serial Queue): 让任务**一个接一个地执行**
```objective-c
//串行队列
dispatch_queue_t queue = dispatch_queue_create("label2", DISPATCH_QUEUE_SERIAL);
```

* 主队列: 会通过主线程执行UI刷新, 用户输入处理等任务
```objective-c
//主队列（主线程执行任务）
dispatch_queue_t queue = dispatch_get_main_queue();
```

##### 串行, 并行队列以及同步,异步函数的实践

* 异步函数 + 并发队列: 会开启**多条新线程**，队列中的任务异步执行
```objective-c
- (void)asyncConcurrent {

    //1.创建队列 -- 并发队列
    dispatch_queue_t queue = dispatch_queue_create("conQueue", DISPATCH_QUEUE_CONCURRENT);
    
    //2.封装异步任务并添加到队列中
    /*
     参数1：队列名
     参数2：要执行的任务
     */
    //测试是否开启了多条线程
    dispatch_async(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
}
```

* 异步函数 + 串行队列 -- 会开启**一条新线程**，队列中的任务串行执行
```objective-c
- (void)asyncSerial {
    //创建队列 -- 串行队列
    dispatch_queue_t queue = dispatch_queue_create("serQueue", DISPATCH_QUEUE_SERIAL);
    
    //异步函数
    dispatch_async(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
}
```

* 异步函数 + 主队列: **不会**开启线程，队列中任务都在**主线程**中执行
```objective-c
- (void)asyncMain {
    //创建主队列
	dispatch_queue_t queue = dispatch_get_main_queue();
    
    //异步函数
    dispatch_async(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_async(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_async(queuaaa
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
}
```

* 同步函数 + 并发队列: **不会**开启新线程
```objective-c
- (void)syncConcurrent {
    //创建并发队列
    dispatch_queue_t queue = dispatch_queue_create("conQueue", DISPATCH_QUEUE_CONCURRENT);
    
    //同步函数
    dispatch_sync(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
}
```

* 同步函数 + 串行队列: **不会**开启线程
```objective-c
- (void)syncSerial {
    //创建串行队列
    dispatch_queue_t queue = dispatch_queue_create("serQueue", DISPATCH_QUEUE_SERIAL);
    
    //同步函数
    dispatch_sync(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
}
```

* 同步函数 + 主队列: 产生**死锁**
	* 避免死锁: 用子线程调用syncMain()
```objective-c
- (void)syncMain {
    //创建主队列
	dispatch_queue_t queue = dispatch_get_main_queue();
    
    //同步函数
    dispatch_sync(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
    dispatch_sync(queue, ^{
        NSLog(@"download1 --- %@", [NSThread currentThread]);
    });
}
```

回到: [[多线程2__多线程开发#实现汇总]]

#### gcd实现线程间通信
```objective-c
//网络图片下载Demo -- GCD实现
#import "ViewController.h"

@interface ViewController ()

@property(nonatomic, strong) UIImageView *imageView;

@end

@implementation ViewController
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event  {
    
    //1.使用GCD开子线程 -- 使用异步函数
    dispatch_async(dispatch_get_global_queue(0, 0), ^{ //获取全局并发队列
        //封装任务
        //确定图片URL
        NSURL *url = [NSURL URLWithString:@"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa1.att.hudong.com%2F62%2F02%2F01300542526392139955025309984.jpg&refer=http%3A%2F%2Fa1.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613890070&t=9b041b83f4ddfe8c165547120f5aa589"];
                    
        //根据URL下载图片二进制数据到本地
        NSData *imageData = [NSData dataWithContentsOfURL:url];
                    
        //图片格式转换
        UIImage *image = [UIImage imageWithData:imageData];
        
        //更新UI
        dispatch_async(dispatch_get_main_queue(), ^{
            self.imageView.image = image;
            NSLog(@"UI--- %@", [NSThread currentThread]);
        });
        
        //同步函数更新UI
        dispatch_sync(dispatch_get_main_queue(), ^{ //此时任务在子线程中执行，因此使用主队列不会造成死锁
            self.imageView.image = image;
            NSLog(@"UI--- %@", [NSThread currentThread]);
        });
    });
}
@end
```

回到: [[多线程2__多线程开发#线程间通信]]



#### gcd注意事项
##### 通过`dispatch_async(queue, ^{block})`将block追加到dispatch queue(无论Concurrent或Serial Queue)中后, 立即通过dispatch_release(queue)释放, 是否会影响block的执行?
不会. 
* 首先: `dispatch_async`或`dispatch_sync`表示追加异步或同步任务到串行队列或并发队列中执行. `queue`并不是OC中类似"block"的对象, 因此没有ARC来自动管理它的内存, 因此需要手动对它(队列对象)进行释放
* 其次: 通过 `dispatch_async`将block追加到queue中, 本质上该block通过`dispatch retain`持有了queue. 因此就算在追加后立即对queue进行release操作, 该queue由于被block持有也不会废弃, 因此block能够正常执行.
