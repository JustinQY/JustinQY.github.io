---
title: NSThread
description: NSthread记录 创建子线程 --- 子线程状态切换 --- 线程间通信实现 ---
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

NSthread记录~~~

## 创建子线程

---

```objective-c
//线程创建方法1 -- allo + init
- (void)createThread1 {
    /*
    第一个参数：目标对象 self
    第二个参数：方法选择器 -> 调用的方法
    第三个参数：前面调用的方法需要传递的参数 -> nil
    */
    NSThread *thread = [[NSThread alloc] initWithTarget:self
      selector:@selector(run:)
        object:@"test"];

    //启动线程
    [thread start];

    //设置线程属性
    thread.name = @"线程A";
    [thread setName:@"线程A"];

    //设置线程优先级 -- 优先级大小(0.0 ~ 1.0), 默认为0.5
    thread.threadPriority = 1.0;

    //线程生命周期 -- 当任务执行完成之后被释放
}

//线程创建方法2 -- 无法获取创建的线程对象
- (void)createThread2 {
    //分离子线程方法
    [NSThread detachNewThreadSelector:@selector(run:) toTarget:self withObject:@"通过分离子线程创建新线程"];
}

//线程创建方法3-- 无法获取创建的线程对象
- (void)createThread3 {
    //开启后台线程方法
    [self performSelectorInBackground:@selector(run:) withObject:@"通过开启后台线程创建新线程"];
}

- (void)test:(NSString *)para {
    NSLog(@"-----test-----%@", [NSThread currentThread]);
}
```

## 子线程状态切换

---

```objective-c
- (void)createThread1 {

    //新建状态
    NSThread *thread = [[NSThread alloc] initWithTarget:self selector:@selector(run:) object:@"test"];

	//就绪或运行状态
    [thread start];
}

- (void)test:(NSString *)para {
    NSLog(@"-----test-----%@", [NSThread currentThread]);

    //阻塞状态
    [NSThread sleepFortimeinterval:2.0];
    [NSThread sleepUntilDate:[NSDate dateWithTimeIntervalSinceNow:3.0]];

	//死亡状态
    [NSThread exit];
}
```

## 线程间通信实现

---

```objective-c
//网络图片下载Demo -- NSThread实现
#import "ViewController.h"

@interface ViewController ()

@property(nonatomic, strong) UIImageView *imageView;
@property(nonatomic, strong) NSThread *threadA;

@end

@implementation ViewController


//耗时操作要用子线程进行
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    //分离一条子线程去执行download方法
    [NSThread detachNewThreadSelector:@selector(download) toTarget:self withObject:nil];
}

- (void)download {
    //确定图片URL
    NSURL *url = [NSURL URLWithString:@"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa1.att.hudong.com%2F62%2F02%2F01300542526392139955025309984.jpg&refer=http%3A%2F%2Fa1.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613890070&t=9b041b83f4ddfe8c165547120f5aa589"];

    //根据URL下载图片二进制数据到本地
    NSData *imageData = [NSData dataWithContentsOfURL:url];

    //图片格式转换
    UIImage *image = [UIImage imageWithData:imageData];

    //回到主线程显示UI的三种方法
    //方法1
    /*
     参数1：回到主线程要调用的方法
     参数2：前面方法需要的参数
     参数3：当前方法剩余部分的执行是否等待参数1方法执行完毕
     */
    [self performSelectorOnMainThread:@selector(showImage:) withObject:image waitUntilDone:YES];

    //方法2 -- 主动选择执行线程为主线程
    [self performSelector:@selector(showImage:) onThread:[NSThread mainThread] withObject:image waitUntilDone:YES];

    //方法3 -- 直接用self.imageView调用主线程方法
    [self.imageView performSelectorOnMainThread:@selector(setImage:) withObject:image waitUntilDone:YES];

}

- (void)showImage:(UIImage *)image {
    self.imageView.image = image;
}
@end
```
