---
title: UICollectionView学习笔记
description: UICollectionView 学习UICollectionView UICollectionView的组成 1. Cell -- 用于展示内容，尺寸和内容可以各不相同。 2. Supplementary Views -- 追加视图，类似于UITableView中每个Section的Header或Footer 3. Decoration View -- 装
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

UICollectionView

## 学习UICollectionView

### UICollectionView的组成

1. Cell -- 用于展示内容，尺寸和内容可以各不相同。
2. Supplementary Views -- 追加视图，类似于UITableView中每个Section的Header或Footer
3. Decoration View -- 装饰视图，跟数据无关，为Cell和Supplementary Views添加辅助视图。

**所有的UICollectionView都有该三个部件组成**

### UICollectionView的实现

1. **dataSource -- 为View提供数据源，给View提供需要显示的数据**  
   &nbsp;&nbsp;&nbsp;方法：  
   &nbsp;&nbsp;&nbsp;1). numberOfSectionsInCollectionView: &nbsp;--&nbsp; 获取section数量  
   &nbsp;&nbsp;&nbsp;2). collectionView:numberOfItemsInSection: &nbsp;--&nbsp; 获取某个section中item的数量  
   &nbsp;&nbsp;&nbsp;3). collectionView:cellForItemAtIndexPath: &nbsp;--&nbsp; 对于某个位置的cell是怎样的  
   &nbsp;&nbsp;&nbsp;4). collectionView:viewForSupplementaryElementOfKind:atIndexPath: &nbsp;--&nbsp; 对于某个位置的section显示怎样的Supplementary View  
   <br/>

2. **delegate -- 负责实现与用户交互的相应，为样式实现一些细节** <br/>

   &nbsp; &nbsp; 交互举例:<br/>
   &nbsp;&nbsp;&nbsp;1).cell高亮  
   &nbsp;&nbsp;&nbsp;2).cell选中时的状态  
   &nbsp;&nbsp;&nbsp;3).长按后的菜单显示<br/><br/>
   &nbsp;&nbsp;&nbsp;监听cell点击：(当用户点击cell时触发的delegate询问)<br/>
   <点击事件发生><br/>
   &nbsp;&nbsp;&nbsp; 1).-collectionView:shouldHighlightItemAtIndexPath:&nbsp;--&nbsp;是否应该高亮？<br/>
   &nbsp;&nbsp;&nbsp; 2).-collectionView:didHighlightItemAtIndexPath:&nbsp;--&nbsp;确认显示高亮（如果1返回YES则执行，否则不执行） <br/>
   <点击事件结束(手指抬起)> <br/>
   &nbsp;&nbsp;&nbsp; 3).-collectionView:shouldSelectItemAtIndexPath:&nbsp;--&nbsp;是否应该选中被点击的cell(如果1返回NO这里不再询问询问是否选中) <br/>
   &nbsp;&nbsp;&nbsp; 4).-collectionView:didSelectItemAtIndexPath:&nbsp;--&nbsp;确认选中被点击的cell(如果3中返回选中，调用选中) <br/>
   &nbsp;&nbsp;&nbsp; 5).-collectionView:didUnhighlightItemAtIndexPath:&nbsp;--&nbsp;确认取消高亮(如果1返回YES，那么会调用取消高亮) <br/><br/>

3. **UICollectionViewLayout -- 为CollectionView定义一些独特的布局**

### UICollectionView子视图的复用

**UICollectionView中所有视图都来自一个可复用的基类 --> UICollectionReusableView， 在UICollectionView中，对于cell，Supplementary View和Decoration View都是需要复用的。**

### UICollectionVIewCell的组成

**相比于UITableViewCell，UICollectionViewCell不存在style，没有titleLabel和内置的imageView属性**
<br/>
1.cell &nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp; 在这里是UICollectionReusableView <br/>
2.backgroundvView &nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp; cell的背景视图，可以设置背景图片 <br/>
3.selectedBackgroundView &nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp; cell被选中时的背景视图 <br/>
4.contentView &nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp; 内容视图，自定义cell时将内容放在这个View上 <br/>

### 布局 -- UICollectionViewLayout

**UICollectionViewLayout是UICollectionView特有的，可以将每个cell, Supplementary View和Decoration View进行组合，为它们设置各自的属性(位置，大小，透明度，层级关系，形状等)。它可以决定UICollectionView如何显示在界面上。**

1.**流水布局(线性布局)** &nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;**UICollectionViewFlowLayout**

&nbsp;&nbsp;&nbsp;&nbsp;属性：

​ 1).**CGSize itemSize** &nbsp;--&nbsp;定义每一个item的size，可以快捷地给cell设置大小
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2).**CGFloat minimumLineSpacing** &nbsp;--&nbsp;最小行间距
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3).**CGFloat minimumInteritemSpacing** &nbsp;--&nbsp;最小cell之间的距离
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4).**UIEdgeInsets sectionInset** &nbsp;--&nbsp;设置UIcollectionView整体的组内边距
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5).**CGSize headerReferenceSize** &nbsp;--&nbsp;设置supplementary header View的大小
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6).**CGSize footerReferenceSize** &nbsp;--&nbsp;设置supplementary footer View的大小
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7).**UICollectionViewScrollDirection scrollDirection** &nbsp;--&nbsp;设置UICollectionView的滚动方向

2.**UICollectionViewAttributes布局属性**

&nbsp;&nbsp;&nbsp;&nbsp;属性：

​ 1).**CGRect frame** &nbsp;--&nbsp;布局视图的frame<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2).**CGPoint center** &nbsp;--&nbsp;视图中心点
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3).**CGSize size** &nbsp;--&nbsp;视图尺寸
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;4).**CGAffineTransform transform** &nbsp;--&nbsp;转场属性
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5).**CGFloat alpha** &nbsp;--&nbsp;透明度
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6).**NSInteger zIndex** &nbsp;--&nbsp;层级(数字越大，层级越高)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7).**registerClass:forDecorationViewOfKind** &nbsp;--&nbsp;注册Decoration View  
<br/>

3.**UICollectionViewLayout自定义布局**

​ **一些处理布局的方法**

​ 1).@interface UICollectionViewLayout (UISubclassingHooks) 布局UICollectiojnView的子视图

​ 2).@interface UICollectionViewLayout (UIUpdateSupportHooks) 布局删除插入动作

​ 3).@interface UICollectionViewLayout (UIReorderingSupportHooks) 移动动作布局
