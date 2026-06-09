---
title: Images Classifier
description: 1. Classic networks like LeNet-5, AlexNet and VGG; 2. Architectures like ResNet and Inception Net to improve performance of CNNs; 3. MobileNets to allow mobile devices to run apps
date: '2024-12-27T12:53:13.000Z'
draft: false
heroImage: /images/blog/computer_vision_1.jpeg
showHeroImage: true
tags:
  - Computer Vision
  - CV
categories:
  - CV
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

1. Classic networks like LeNet-5, AlexNet and VGG;
2. Architectures like ResNet and Inception Net to improve performance of CNNs; 
3. MobileNets to allow mobile devices to run apps of classifier systems; 
4. Transfer Learning and Data Augmentation to start your system faster and make your classifier stronger.


<br/>

## **Classic Networks**

### **LeNet-5**
---
#### **Used**
Classify hand-write digit
#### **Trained**
Gray scale images (32 * 32 * 1)
#### **Params**
60k
#### **Paper**
Gradient-based learning applied to document recognition (part II)
#### **Feature**
1. as going deeper in the network, n_H, n_W goes down, n_C goes up
2. structure: conv-pool-conv-pool-fc-fc-output
3. using average pooling layers, and sigmoid/tanh rather than ReLu functions in the hidden layers

<br/>

### **AlexNet**
---
#### **Used**
Image Recognition
#### **Trained**
RGM images (227*227*3)
#### **Params**
60m 
#### **Paper**
ImageNet classification with deep convolutional neural networks
#### **Feature**
1. using ReLu function
2. multiple GPUs (GPU communicate with each other)
3. Local Response Normalization (choose a position in a image and normalize every same position among all channels)

<br/>

### **VGG - 16**
---
#### **Used**
#### **Trained**
RGM images (224*224*3)
#### **Params**
138m
#### **Paper**
Very deep convolutional networks for large-scale image recognition
#### **Feature**
1. fixed filters: CONV = 3 * 3 filter, s = 1, same convolution; Max-Pool = 2 * 2, s = 2
2. the n_H and n_W shrink double (after every pool layer) or n_C grows double (after every conv layer)

<br/>

### **Residual Network**
---
For very deep networks, there are usually problems like gradient vanishing and gradient explosion.

With ResNets, we can train very deep networks.

#### **Residual Block**
1. A residual block contains some _extra layers_ and a _skip connection_. (for example below, 2 fully-connected layers and 1 skip connection)
2. A _residual network_ is a neural network contains _multiple residual blocks_.

```python
a[l] ---> Linear ---> ReLu ---> a[l+1] ---> Linear ---> ReLu ---> a[l+2]  (main path)
      |                                             ^
      |                                             | pass 'a[l]' here before ReLu
      ---------skip connection / short cut-----------

Before: a[l+2] = g(z[l+2)
After Adding Residual Block: a[l+2] = g(z[l+2] + a[l])
```

#### **Paper**
Deep residual networks for image recognition
#### **Features**
1. compared to plain networks, ResNet allows us to have a reasonable training error even we have many layers.
2. Identity function is easy for Residual Block to learn. (That's why adding more layers to the network doesn't hurt the performance)
3. usually use 'same convolutions' in ResNets to make a[l] and z[l+2] have the same dimension. (If not, add an extra matrix 'Ws' to a[l])
4. we can turn a plain net into a res net by adding residual blocks.

<br/>

### **1*1 Convolutions Network**
---
one-by-one convolution is like having a **_fully-connect neural network_** that apply to each position of the input channels.
#### **Paper**
Network in network
#### **Features**
1. use one-by-one convolutions to **_shrink the number of volume_**

<br/>

### **Inception Network ('Google Net': Inception V1)**
---
In generally speaking: Instead of needing to pick any size of the filters or pooling, we do them all and concatenate all the outputs. Let the network learn whatever params it wants to use. 

Inception Network: Neural network puts a lot of inception modules together.

#### **Paper**
Going deeper with convolutions
#### **Inception Module (inception blocks)**
```python
                  --------------------------------> 1 * 1 CONV ---------|
                  |                                                     |
Previous          |------------> 1 * 1 CONV ------> 3 * 3 CONV ---------|       Channel
Activation  ------                                                      |---->  Concat
                  |------------> 1 * 1 CONV ------> 5 * 5 CONV ---------|
                  |                                                     |
                  ----------> MaxPool(Padding) ---> 1 * 1 CONV ---------|
```

#### **Feature**
1. Computational Cost: Use 1*1 convolution to shrink the channel first, then do regular convolutions.
2. Have several side branches that also predict like the output layer (ends with a softmax function), this has a regularizing effect and reduces the overfitting.

<br/>

### **MobileNet V1**
---
#### **Depthwise Separable Convolution _(Building Block of MobileNets)_**

##### **Depthwise Convolution**
n_c filters, each filter(size: f * f * 1) convolve with each channel of input, the channel of output will be the same as input  

##### **Pointwise Convolution _(Projection)_**
n_c' filters, each filter(size: 1 * 1 * n_c) convolve with the whole input, the channel of output will be n_c'

#### **Paper**
MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications

#### **Feature**
1. Low computational cost at deployment: MobileNets cost usually $\frac{1}{n_c'} + \frac{1}{f * f}$ times of that in normal convolutions, which is about 10 times cheaper.
2. Useful for mobile and embedded vision applications

<br/>

### **MobileNet V2**
---
#### **Paper**
MobileNetV2: Inverted Residuals and Linear Bottlenecks

#### **Bottleneck Block**
```python
    --------------------------------- Residual Connection -------------------------------
    |                                                                                   |
    |           (channel expands)                         (channel shrinks)             v
--------> n * n * 3 --------> n * n * 18 --------> n * n * 18 ----------> n * n * 3 --------->
                        ^                    ^                     ^
                        |                    |                     |
                    1 * 1 * 3            Depthwise             1 * 1 * 18
                    Expansion        (same convolution)        Pointwise/Projection
                   (18 filters)         (18 filters)           (3 filters)
```

#### **Why using Bottle Block?**
1. By using 'Expansion', it lets the neural network to learn a richer function by increasing the representation. (From n * n * 3 to n * n * 18)
2. Memory is limited for mobile devices, so bottleneck block uses 'Pointwise/Projection' operation to shrink the representation before pass it to next block. (When passing, the memory needs to pass these values reduced.)

<br/>

### **EfficientNet**
---
How to automatically increase or scale the size of the neural network on different devices?

'_Good Trades off_' between image resolution, depth of the network and width of the layers.

#### **Paper**
EfficientNet: Rethinking Model Scaling for Convolutional Neural Network

<br/>

### **Transfer Learning**
---
How to create a classifier for myself if I don't have much data? Using Transfer Learning!

In Computer Vision, transfer learning is one thing that you should almost always do.(Unless you have an exceptionally large data set)

#### **Freeze Layers**

##### **When you have Little Data**

1. Download a open-sourced implementation of neural network(with its weights), **replace the softmax and output** layer with your own layers and **_freeze the other layers_**.
2. _Train your own 'softmax' and 'output' layers._

##### **When you have Large Data**

_Freeze fewer_ layers and _train the later_ layers (Initialize the weights of later layers and run gradient descent on them. / Blow away these layers and create you own layers.).

##### **When you have A Lot of Data**

_Change the 'softmax' and 'output'_ layers, and _train the whole_ network.

##### **Neat Trick to Speed up Training**
Since you froze several layers and didn't want to train them: **_pre-compute the last frozen layer for all training sets and save the results to disk_**. 

So you just need to train a shallow softmax classifier instead of a big one.

Fast Reason: You don't need to calculate the frozen layers **everytime** you train the network.

<br/>

### **Data Augmentation**
---
#### **Common augmentation methods (distortions)**
1. Mirroring
2. Random Cropping
3. Color shifting: Add different distortions to RGB channels. (color distortion algorithm: PCA Color Augmentation-Principles Component Analysis)

#### **Less using methods**
1. Rotation
2. Shearing
3. Local warping

#### **Hyper params in Data Augmentation**
A good way is to use others' trained hyper params in their network.

#### **Implementing Distortions**
```python
implementing distortions during training:

                                  distortions
hard disk           ----- data1 ------->-------- new data1 ------          
  ----             |                                             |
  |  |  --- load ---                                             ---------> Training
  ----             |              distortions                    |   
                    ----- data2 ------->-------- new data2 ------            CPU/GPU --------
                                                                                             |----> can run in parallel
                                    CPU threads  --------------------------------------------
                     (loading data and implementing distortions)

```

<br/>

### **Tips for Benchmarks and Competitions**
---
1. **Ensembling** (_maybe 1% or 2% better, needs much memory_): Train several networks independently and average their outputs.(like 'tree ensemble')
2. **Multi-crop at test time** (_a little bit better, don't need much memory_): Run classifier on multiple versions of test images and average results. (10-crop)

<br/>

### **Tips for Building a Computer Vision Practical System**
---
1. Use architectures of networks published in the literature.
2. Use open source implementation if possible.
3. Use pretrained models and fine-tune on your dataset.
4. If you have huge data or need to invent a system by yourself, you can make a system from scratch.

<br/>

**Reference**
1. https://www.coursera.org/learn/convolutional-neural-networks/home/week/2
