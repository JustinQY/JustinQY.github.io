---
title: iOS网络之多线程
description: 记录iOS多线程开发的基本知识和使用方法, 积累iOS开发经验 一些基本概念 --- 一个应用程序可以对应多个进程, 每个进程中至少有一个线程, 进程中的线程共享该进程的资源. 线程执行任务的方式 -- 串行（任务和任务之间有执行顺序，即多个任务一个一个地按顺序执行，一个线程同时只能执行一个任务） 单个进程中的每条线程可以并行执行任务 同一时间CPU只能处理
date: '2024-07-05T02:40:48.000Z'
draft: false
heroImage: /images/blog/network.jpg
showHeroImage: true
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

记录iOS多线程开发的基本知识和使用方法, 积累iOS开发经验~~~

## 一些基本概念

---

- 一个应用程序可以对应多个进程, 每个进程中至少有一个线程, 进程中的线程共享该进程的资源.
- 线程执行任务的方式 -- 串行（任务和任务之间有执行顺序，即多个任务一个一个地按顺序执行，一个线程同时只能执行一个任务）
- 单个进程中的每条线程可以并行执行任务
- 同一时间CPU只能处理一条线程，即只有一条线程在工作. 所以多线程并发执行，实则是CPU快速地在线程之间调度切换.

### 原子性与非原子性

#### atomic 原子属性

1. 为setter方法加锁（默认为atomic）
2. 线程安全，消耗大量资源

#### nonatomic 非原子属性

1. 不会为setter方法加锁
2. 非线程安全，适合小内存移动设备

## 多线程的优缺点

---

### 优点

- 适当提高程序的执行效率和资源利用率

### 缺点

- 空间开销：内核数据结构，栈空间
- 时间开销：约90ms的创建时间
- 性能降低：在开启大量线程时降低程序性能，同时CPU调度线程时开销更大
- 程序设计：线程之间通信，多线程数据共享（同一数据被多个线程共享导致数据安全问题）更加复杂

## 主线程与子线程

---

### 主线程的概念

一个iOS程序运行后，默认开启一条“主线程”或“UI线程”

### 主线程的作用

1. 显示/刷新UI
2. 处理UI事件（点击，滚动，拖拽等）

### 主线程注意事项

1. 凡是和**UI相关的操作**必须在主线程中执行
2. **不要**将耗时操作放在主线程中 -- 会卡住主线程，严重影响UI流畅度，降低用户体验

### 子线程的概念

用来执行耗时操作的线程

## 多线程实现方案

---

| **技术方案**                             | **简介**                                                                                      | **语言** | **线程生命周期** | **使用频率** |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- | -------- | ---------------- | ------------ |
| [pthread](/2024/07/04/iOS/iOS_pthread)   | 1.通用的多线程API<br/>2.适用于Unix/Linux/Windows等系统<br/>3.跨平台/可移植<br/>4.使用难度较大 | C语言    | 程序员管理       | 少           |
| [NSThread](/2024/07/04/iOS/iOS_NSThread) | 1.更加面向对象<br/>2.简单易用，可直接操作线程对象                                             | OC       | 程序员管理       | 正常         |
| [gcd](/2024/07/04/iOS/iOS_gcd)           | 1.旨在代替NSThread等线程技术<br/>2.充分利用设备的多核资源                                     | C        | 自动管理         | 经常使用     |
| NSOperation                              | 1.基于GCD，增加了一些简单功能<br/>2.更加面向对象                                              | OC       | 自动管理         | 经常使用     |

## 多线程安全问题

---

### [数据竞争](/2024/07/04/iOS/iOS_datarace/)

当多个线程同时访问和修改同一共享资源且**至少一个是写操作**时，会导致数据竞争。

### [死锁](/2024/07/04/iOS/iOS_deadlock/)

当两个或多个线程互相等待对方释放资源时，会导致死锁，所有相关线程都会被永远阻塞。

### 线程饥饿(**Thread Starvation**)

当某些线程长时间得不到资源访问权时，会导致线程饥饿问题。

### 上下文切换开销(**Context Switching Overhead**)

上下文切换开销是指CPU在不同线程之间切换时保存和恢复线程状态的过程. 频繁的上下文切换会导致性能开销增加，影响应用的响应速度和效率。

```objective-c
dispatch_queue_t queue = dispatch_queue_create("com.example.concurrentQueue", DISPATCH_QUEUE_CONCURRENT);

// 问题举例
for (int i = 0; i < 1000; i++) {
	dispatch_async(queue, ^{
		NSLog(@"Task %d", i);
	});
}

// 解决方法
// 减少任务的数量或调整任务的粒度，减少不必要的上下文切换。
dispatch_async(queue, ^{
	for (int i = 0; i < 1000; i++) {
		NSLog(@"Task %d", i);
	}
});
```

## 保证线程安全的方式

---

### 使用同步机制

- 互斥锁 (Mutex) : 使用 `@synchronized`、`NSLock`、`pthread_mutex` 等来保护临界区，确保同一时刻只有一个线程可以访问共享资源。
- 递归锁 (NSRecursiveLock): 用于允许同一线程多次获得同一个锁，而不会导致死锁。
- 条件锁 (NSConditionLock): 用于处理线程之间的依赖关系，允许线程在某个条件满足时继续执行。

### 使用gcd

- 串行队列
- 并发队列
- 异步任务

### 使用原子操作

- OSAtomic: 提供一些原子操作函数，如 `OSAtomicIncrement32`，但在 iOS 10 之后被 `stdatomic` 替代。
- stdatomic: C11 标准库中的原子操作，提供对基本类型的原子读写操作。

### 使用线程安全的容器

- NSOperationQueue: 提供了更高级的线程管理和任务调度机制，适用于需要更复杂依赖关系和优先级管理的场景。
- 线程安全的集合类: 如 `NSCache` 等，内部已经实现了线程安全机制。

### 避免共享状态

- 尽量减少共享状态，通过消息传递或复制数据来避免多个线程同时访问同一个资源。

### 使用不可变对象

- 尽可能使用不可变对象（如 `NSString`、`NSArray` 等），避免在多个线程中修改同一个对象的状态。

## 线程间通信

---

### 概念

A线程传递数据给B线程
A线程执行完特定任务后，转到B线程继续执行任务

### [NSThread线程间通信](/2024/07/04/iOS/iOS_NSThread/#线程间通信实现)

### [gcd线程间通信](/2024/07/04/iOS/iOS_gcd/#gcd实现线程间通信)

## 一些demo

---

### I 延迟执行

```objective-c
//ViewController.m

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event  {
    [self delay];
}

//延迟执行
- (void)delay {
    NSLog(@"start---- delay running");

    //1.延迟执行的第一种方法
    [self performSelector:@selector(task) withObject:nil afterDelay:2.0]; //2.0秒延迟之后执行

    //2.延迟执行的第二种方法
    [NSTimer scheduledTimerWithTimeInterval:2.0 target:self selector:@selector(task) userInfo:nil repeats:YES]; //在2.0秒延迟之后每2.0秒执行一次task方法

    //3.GCD实现延迟执行
    /*
     参数1：DISPATCH_TIME_NOW 从现在开始计算时间
     参数2：延迟的时间 2.0 GCD时间单位：纳秒
     参数3：队列
     */
    dispatch_queue_t queue = dispatch_get_main_queue(); //使用主队列
    //dispatch_queue_t queue = dispatch_get_global_queue(0, 0); //使用全局并发队列
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), queue, ^{ //从现在开始计时，2.0*10e9纳秒延迟后执行block
        NSLog(@"GCD --- %@", [NSThread currentThread]);
    });
}

- (void)task {
    NSLog(@"task --- %@", [NSThread currentThread]);
}
```

### 一次性代码 (不可放入懒加载中)

```objective-c
//一次性代码 -- 整个应用程序运行期间只执行一次
- (void)once {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        NSLog(@"---once---");
    });
}
```

### 栅栏函数 -- 控制并发队列任务执行顺序(栅栏后的任务等待栅栏执行后才会执行)

```objective-c
//ViewController.m

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event  {

    //0.创建并发队列
    dispatch_queue_t que = dispatch_queue_create("download", DISPATCH_QUEUE_CONCURRENT);

    //1.异步函数开线程
    dispatch_async(que, ^{  //任务1
        NSLog(@"download1---%@", [NSThread currentThread]);
    });

    dispatch_async(que, ^{  //任务2
        NSLog(@"download2---%@", [NSThread currentThread]);
    });

    //栅栏函数 -- 不可使用全局并发队列

    dispatch_barrier_async(que, ^{
        NSLog(@"++++++++++++++++");
    });

    dispatch_async(que, ^{  //任务3
        NSLog(@"download3---%@", [NSThread currentThread]);
    });

    dispatch_async(que, ^{  //任务3
        NSLog(@"download4---%@", [NSThread currentThread]);
    });
}
```

### 快速迭代

```objective-c
//文件剪切Demo -- 快速迭代并发遍历并剪切文件

//开子线程和主线程一起完成并发任务，任务并发执行
- (void)apply {
     /*
     参数1：遍历次数
     参数2：并发队列
     参数3：遍历索引
     */
    dispatch_apply(100, dispatch_get_global_queue(0, 0), ^(size_t index) {
        NSLog(@"%zd --- %@", index, [NSThread currentThread]);
    });
}

- (void)moveFile {
    //1.拿到文件路径
    NSString *from = @"/Users/qiaoyibo/Downloads/from";

    //2.获得目标文件路径
    NSString *to = @"/Users/qiaoyibo/Downloads/to";

    //3.得到目录下面的所有文件(名)
    NSArray *subPaths = [[NSFileManager defaultManager] subpathsAtPath:from];

    //4.遍历所有文件，执行剪切操作
    NSInteger count = subPaths.count;

    dispatch_apply(count, dispatch_get_global_queue(0, 0), ^(size_t i) {
        //4.1 拼接文件全路径
        //拼接时自动添加路径间的'/'
        NSString *fullPath = [from stringByAppendingPathComponent:subPaths[i]];
        NSString *tofullPath = [to stringByAppendingPathComponent:subPaths[i]];

        //4.2 执行剪切操作
        /*
         参数1：要剪切的文件在哪
         参数2：文件应该被存放到哪里
         参数3：默认为nil
         */
        [[NSFileManager defaultManager] moveItemAtPath:fullPath toPath:tofullPath error:nil];
    });
}
```

### 队列组

```objective-c
//队列组的拦截监听作用
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    //1.创建队列
    dispatch_queue_t queue = dispatch_get_global_queue(0,0);

    //2.创建队列组
    dispatch_group_t group = dispatch_group_create();

    //异步函数
    /*
     1)封装任务
     2)把任务添加到队列中
     3)会监听任务的执行情况，通知group
     */
    dispatch_group_async(group, queue, ^{
        NSLog(@"1-----%@", [NSThread currentThread]);
    });
    dispatch_group_async(group, queue, ^{
        NSLog(@"2-----%@", [NSThread currentThread]);
    });
    dispatch_group_async(group, queue, ^{
        NSLog(@"3-----%@", [NSThread currentThread]);
    });

    //拦截通知，当队列组中所有的任务都执行完毕的时候会进入到下面的方法
    dispatch_group_notify(group, queue, ^{
        NSLog(@"-----拦截任务组-----");
    });
}
```

```objective-c
//将后续任务加入队列组
- (void)test {
    //1.创建队列
    dispatch_queue_t queue = dispatch_get_global_queue(0, 0);

    //2.创建队列组
    dispatch_group_t group = dispatch_group_create();

    //3.在该方法后面的”异步任务“会被纳入到队列组监听范围，进入群组
    //enter和leave 必须配对使用
    dispatch_group_enter(group);

    dispatch_async(queue, ^{
        NSLog(@"1----%@", [NSThread currentThread]);

        //离开群组
        dispatch_group_leave(group);
    });

    dispatch_group_enter(group);

    dispatch_async(queue, ^{
        NSLog(@"2----%@", [NSThread currentThread]);

        dispatch_group_leave(group);
    });

    //拦截通知
    //该方法是异步的
    dispatch_group_notify(group, queue, ^{
        NSLog(@"------dispatch_group_notify-------");
    });
    NSLog(@"------dispatch_group_notify------");//异步测试

    //等待（死等）
    //该方法是阻塞的
    dispatch_group_wait(group, DISPATCH_TIME_FOREVER);
    NSLog(@"------dispatch_group_wait------"); //阻塞测试

}
```

```objective-c
//下载图片1和2，合成并显示图片
- (void)test {

    //获得全局并发队列
    dispatch_queue_t queue = dispatch_get_global_queue(0, 0);

    //获取队列组
    dispatch_group_t group = dispatch_group_create();

    //开子线程下载图片1
    dispatch_group_async(queue, group, ^{
        NSURL *url = [NSURL URLWithString:@""];
        NSData *imageData = [NSData dataWithContentsOfURL:url];
        UIImage *image1 = [UIImage imageWithData:imageData];

    });

    //开子线程下载图片2
    dispatch_group_async(queue, group, ^{
        NSURL *url = [NSURL URLWithString:@""];
        NSData *imageData = [NSData dataWithContentsOfURL:url];
        UIImage *image1 = [UIImage imageWithData:imageData];

    });

    //合成图片
    dispatch_group_notify(group, queue, ^{

        //创建图形上下文
        UIGraphicsBeginImageContext(CGSizeMake(200, 200));
        //画图1
        [self.image1 drawInRect:CGRectMake(0, 0, 200, 200)];
        //画图2
        [self.image2 drawInRect:CGRectMake(0, 100, 200, 100)];
        //根据上下文得到一张图片
        UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
        //关闭上下文
        UIGraphicsEndImageContext();
        //更新UI
        dispatch_async(dispatch_get_main_queue(), ^{
            NSLog(@"UI---------%@", [NSThread currentThread]);
            self.imageView.image = image;
        });
    });
}
```
