---
title: Linear Regression (线性回归模型)
description: linear regression model 线性回归模型(Linear Regression) --- 线性回归模型可以根据一些特征值(feature x)数据, 计算一个可能的结果(预测), 这个结果是无限多个数中的一个. 例如根据房屋个数, 房屋面积, 花园面积和房屋建成年份等特征值进行房价预测等. In a word, linear regress
date: '2024-07-08T13:36:00.000Z'
draft: false
heroImage: /images/blog/ai.jpg
showHeroImage: true
tags:
  - ML
  - Machine Learning
categories:
  - Machine Learning
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

linear regression model~


## 线性回归模型(Linear Regression)

---

线性回归模型可以根据一些特征值(feature x)数据, 计算一个可能的结果(预测), 这个结果是无限多个数中的一个. 例如根据房屋个数, 房屋面积, 花园面积和房屋建成年份等特征值进行房价预测等.

In a word, linear regression predicts **sequential** values.

### **模型表示**
$$
f_{\vec{w},b}(\vec{x}) = \vec{w} \cdot \vec{x} + b
$$

其中 $f(\vec{x})$ 是模型预测结果(也称作 $\hat{y}$ ), $\vec{x}$ 是输入模型的特征值. 而 $\vec{w}$ 和 b (weight and bias)是模型的两部分参数. 选择适当的 $\vec{w}$ 和 b 能使模型更好地对特征值进行拟合, 从而获得更准确的预测结果.

这里 $\vec{x}$ 和 $\vec{w}$ 使用向量表示. 对于特征值来说, 大部分情况下会有很多个维度的特征值(如上面房屋的多个信息), 因此对应地, 每个特征值都需要一个w系数来调整该特征值在整个模型中的权重.

b表示一个偏差, 它不受特征值集合的维度影响, 因此是一个常数.


### **代价函数(cost function)**
为了使模型的预测结果尽可能准确或者符合预期, 我们需要尽可能找到一组最合适的 $\vec{w}$ 和 b.

对于已有数据集, 假设模型的预测结果为 $\hat{y}^{(i)}$ , 而实际值为 $y^{(i)}$ , 预测结果和实际值的差距为 $y^{(i)}$ - $\hat{y}^{(i)}$ , 即**建模误差**(modeling error)

而代价函数的大致定义就是: 对于整个输入集, 所有建模误差的平方和. 即
$$
J = \frac{1}{2m} \sum_{i=1}^{m} \left( \hat{y}^{(i)} - y^{(i)} \right)^2
$$
其中, J是关于 $\vec{w}$ 和 b 的函数, 而 $\hat{y}$ 就是 $f_{\vec{w},b}(\vec{x})$.

### **梯度下降(gradient descent)**
我们的目标是找到 $\vec{w}$ 和 b 使得**代价函数J**最小. 一种自动化通过程序实现的方式称作“梯度下降”.

课程中举例: 想象一下你正站立在山的这一点上，站立在你想象的公园这座红色山上，在梯度下降算法中，我们要做的就是旋转360度，看看我们的周围，并问自己要在某个方向上，用小碎步尽快下山。这些小碎步需要朝什么方向？如果我们站在山坡上的这一点，你看一下周围，你会发现最佳的下山方向，你再看看周围，然后再一次想想，我应该从什么方向迈着小碎步下山？然后你按照自己的判断又迈出一步，重复上面的步骤，从这个新的点，你环顾四周，并决定从什么方向将会最快下山，然后又迈进了一小步，并依此类推，直到你接近局部最低点的位置。

梯度下降的算法公式:
repeat **simultaneously** until converge: {
$$
w = w - \alpha \frac{\partial}{\partial w} J(w, b)
$$
$$
b = b - \alpha \frac{\partial}{\partial b} J(w, b)
$$
}

其中 $\alpha$ 是学习率 (learning rate), 表示每一次梯度下降的“步长”(即w和b在某个下降的方向上减少的程度, 学习率越大则w和b下降越快, 反之则越慢)

上下等式的 $\partial J(w, b)$ 是指代价函数J分别对 w 和 b 求偏导, 其结果应该是:
$$
\frac{\partial}{\partial w} J(w, b) = \frac{1}{m} \sum_{i=1}^{m} \left( \hat{y}^{(i)} - y^{(i)} \right) x^{(i)}
$$
$$
\frac{\partial}{\partial b} J(w, b) = \frac{1}{m} \sum_{i=1}^{m} \left( \hat{y}^{(i)} - y^{(i)} \right)
$$

梯度下降的执行:
给定一组w和b的初始值, 将下面的偏导结果运用到梯度下降公式中, 并**同时**更新w和b的值直到收敛(代价函数值随着每次梯度下降的执行不再减小并左右微小跳动).

线性回归模型的代价函数J是关于w和b的二次函数且是一个凸函数, 所以在其定义域内有且仅有一个最小值, 即全局最小值. 所以我们指定一组初始的w和b, 经过梯度下降算法之后总能找到代价函数的最小值.

<br/>


### **线性回归模型和梯度下降算法**
经过上面的学习, 我们便掌握了一种机器学习预测模型(线性回归模型)和一种机器学习模型训练算法(梯度下降算法).

## Reference
1. https://www.coursera.org/learn/machine-learning/lecture
