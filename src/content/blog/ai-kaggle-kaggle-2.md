---
title: kaggle新手入门指北
description: Kaggle小白快速上手指北 准备工作 --- 比赛选择 上来先筛选出新手模块的competition, 因为我本人是新手, 并且想练习课程中学到的知识, 所以就从简单的开始了 了解比赛信息 Description 描述信息 根据"Description"模块可以快速了解题目背景, 因为kaggle中的题目(我目前接触到的)都与现实紧密结合, 所以我认为多了
date: '2024-07-08T21:18:25.000Z'
draft: false
heroImage: /images/blog/pythonnotebook.jpg
showHeroImage: true
tags:
  - Kaggle
categories:
  - Kaggle
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Kaggle小白快速上手指北~~~

## 准备工作

---

### **比赛选择**

上来先筛选出新手模块的competition, 因为我本人是新手, 并且想练习课程中学到的知识, 所以就从简单的开始了~~
![competition_filter](/images/blog/screencatch/competition_filter.png)
<br>

### **了解比赛信息**

#### **Description 描述信息**

根据"Description"模块可以快速了解题目背景, 因为kaggle中的题目(我目前接触到的)都与现实紧密结合, 所以我认为多了解题目背景有助于日后的工作.
![competition_overview](/images/blog/screencatch/competition_overview.png)
<br>

#### **Data Description 数据描述**

我们可以切换到"Data"tab下, 这里会罗列出本场竞赛提供的数据信息, 如训练集, 测试集, 提交样例等等. 熟悉ACM(ICPC)的朋友应该对这些并不陌生. 翻到页面最下方可以下载所有的数据文件, 本地用"Pycharm"打开就可以详细地浏览啦~
![competition_data_description](/images/blog/screencatch/competition_data_description.png)
<br>

#### **Evaluation 模型评估**

就像算法竞赛, 我们了解了题目, 熟悉了输入数据后, 最重要的是要看看怎么得分~切回"Overview"tab后下翻, 可以看到"Evaluation"模块, 这里介绍了本场竞赛的目标, 例如预测每一栋房子的售价; 提交的评分标准, 例如这里是按照RMSE(均方根误差); 以及提交文件的正确格式.
![competition_evaluation](/images/blog/screencatch/competition_evaluation.png)
<br>

### **添加比赛到Collection**

在比赛详情页右上角"···"处添加该比赛到Collection, 这样有一个好处是在提交时更方便选择Notebook(后面会创建), 并且起到收纳的作用, 这样你可以对于多种思路的Notebook实现都收纳在该Collection下.
![competition_create_collection](/images/blog/screencatch/competition_create_collection.png)
这样就能看到刚才创建的Collection了.
![competition_collection_check](/images/blog/screencatch/competition_collection_check.png)
<br>

### **创建Notebook**

我在Kaggle上的比赛都是通过"Notebook"完成的, Notebook是一个类似jupyter的工具, 可以在里面一边通过markdown梳理思路, 描述建模过程, 一边通过内嵌的python编译器来编码实现预测过程.
![competition_create_notebook](/images/blog/screencatch/competition_create_notebook.png)

创建后会在新页面开启这个Notebook, 可以在左上角重新命名, 我这里命名成了"notebook_test_1".
![competition_notebook_rename](/images/blog/screencatch/competition_notebook_rename.png)

还是返回Your Work页面, 刷新后会发现刚才创建的新Notebook. 点击最右边的"···"并在二级菜单把它添加到刚才我们创建的Collection, 这样你的新Notebook就收纳在你创建的本场比赛对应的Collection中了.
![add_notebook_to_collection](/images/blog/screencatch/add_notebook_to_collection.png)

至此, 我们就可以开始愉快地Kaggle之旅了~
