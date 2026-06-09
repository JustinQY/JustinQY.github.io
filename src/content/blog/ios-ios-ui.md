---
title: UI控件
description: UI控件 UI控件 UIView 视图类 用法： UIView view = [[UIView alloc] init]; 常见属性 1. 获得自己的父控件对象 @property (nonatomic, readonly) UIView superview; //父控件只有一个 2. 获得自己的子控件对象 @property (nonatomic, rea
date: '2024-07-04T04:00:00.000Z'
draft: false
showHeroImage: false
tags:
  - iOS
  - Objective-C
categories:
  - iOS
  - Objective-C
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

UI控件


# UI控件
## UIView 视图类
	用法： UIView *view = [[UIView alloc] init];

	常见属性
	  1. 获得自己的父控件对象
		@property (nonatomic, readonly) UIView *superview; //父控件只有一个

	  2. 获得自己的子控件对象
		@property (nonatomic, readonly) NSArray *subviews; //子控件可能有很多个

	  3. 获得控件的Tag
		@property(nonatomic) NSInteger tag;

	  4. 控件的形变属性 -- 旋转角度，比例缩放，平移等
		@property(nonatomic) CGAffineTransform transform;

	  5. 控件矩形框在父控件上的位置和尺寸
		@property(nonatomic) CGRect frame;
		用法： targetView.frame = CGRectMake(x, y, width, height);

	  6. 控件矩形的位置和尺寸（以自己为坐标原点）
		@property(nonatomic) CGRect bounds;

	  7. 控件中点的位置（控件中心点）
		@property(nonatomic) CGpoint center;
		

	常用方法：
	  1. 添加一个子控件
		- (void) addSubview: (UIView *) view;
		用法： [self.view addSubview(targetView)];

	  2. 将自己从父控件中移除
		- (void) removeFromSuperview;
		用法： [targetView removeFromSuperView];


 
## UILabel 标签类 -- 父类：UIView
	用法： UILabel *label = [[UILabel alloc] init];

	常见属性：(可使用父类的属性)
		1. 显示的文字
			@property(nonatomic, copy) NSString *text;

		2. 显示的字体,可设置字体的大小
			@property(nonatomic, retain) UIFont *font;

		3. 文字的颜色
			@property(nonatomic) UIColor *textColor;

		4. 背景颜色
	 		@property(nonatomic) UIColor *backgroundColor;

		5. 对齐的样式
			@property(nonatomic) NSTextAlignment; textAlignment;

		6. 文字行数
			@property(nonatomic) NSInteger numberOfLines;

		7. 换行模式
			@property(nonatomic) NSLineBreakMode lineBreakMode;

		8. 设置阴影
			@property(nontaomic) UIColor *shadowColor;

		9. 阴影显示位置
			@property(nonatomic) CGSize shadowOffset;
		

## UIImageVIew 图像视图 -- 父类：UIView
	用法： UIImageView *imageView = [[UIImageView alloc] init];

	常见属性：(可用父类属性)
		1. 设置要显示的图片
			@property (nullable, nonatomic, strong) UIImage *image;			使用： imageView.image = [UIImage imageNamed: @"1"]; 
		
		2. 设置图片的样式（枚举）
			@property(nonatomic) UIViewContentMode contentMode;    


## UIButton 按钮控件 -- 父类：UIControl <- UIView
	用法： 

	按钮状态：
		1. 普通状态 normal
		   对应情况：Default  
		   枚举常量： UIControlStateNormal

		2. 高亮状态 highlighted
		   枚举常量： UIControlStateHighlihted
			
		3. 失效状态 disabled
		   枚举常量： UIControlStatedisabled
	
	常用属性：(可使用父类属性)   注意有些属性需要对应按钮的不同状态分别设置
		1. 设置按钮类型（枚举类型）
			@property(nonatomic,readonly) UIButtonType buttonType;
			使用： 结合按钮初始化方法一起使用：
				UIButton *button = [UIButton buttonWithType: 枚举类型的状态变量];

		2. 
	
	常用方法： 以set开头的设置方法，可去类文件中查找并使用
		1. 设置文字标题
			setTitle: forState:

		2. 设置内容图片
			setImage: forState:

		3. 设置背景图片
			setBackgroundImage: forState:

		4. 设置点击按钮执行的方法
			- (IBACtion) clickbutton (UIButton *) sender;

		5. 监听按钮点击
			addTarget: (让谁做事情 -- self) action: @selector(做什么事情 -- 方法) forControlEvent: (事件 -- 对按钮触发了怎样的事件) 


## UITableView
