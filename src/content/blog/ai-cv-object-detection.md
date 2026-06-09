---
title: Object Detection
description: 1. Algorithms for object detection. Object Detection Object detection contains 'Object Localization' and 'Landmark Detection'. --- Object Localization --- 1. Image classification (
date: '2025-01-03T17:14:23.000Z'
draft: false
heroImage: /images/blog/object_detection_1.jpeg
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

1. Algorithms for object detection.



# **Object Detection**

Object detection contains 'Object Localization' and 'Landmark Detection'.

---

## **Object Localization**
---
1. Image classification _(if there is a car in image)_
2. Image classification with localization _(label the car in image and draw a boundary box of the car)_
3. Detection _(detect and localize all cars in the image)_

### **Classification with Localization**
Network for classification: predict the class after softmax layer.

Network for classification and localization: change the output layer to contain **4 more numbers**, 'bx, by, bh, bw'. (add a bounding box)

### **Example of Defining the Target Label y _(one object)_**
1. pedestrian
2. car
3. motorcycle
4. background

```python
    [ Pc: is there any object?  1: one object, 0: no objects (when Pc is 0, other nums make no sense, don't care)
    | bx: mid-point of the bounding box
^   | by: mid-point of the bounding box
y = | bh: height of the bounding box
    | bw: width of the bounding box
    | C1: is the object class 1?
    | C2: is the object class 2?
    [ C3: is the object class 3?
```

## **Landmark Detection**
If you'd like your neural network to output important points and their coordinates, which were called 'landmarks'.

---
### **Example of Defining the Target Label y _(landmark detection)_**
Detect 4 landmarks of the eyes on a person's face: 
1. l1x, l1y (coordinate of left corner of left eye)
2. l2x, l2y (coordinate of right corner of left eye)
3. l3x, l3y (coordinate of left corner of right eye)
4. l4x, l4y (coordinate of right corner of right eye)

```python
    [ Pc: is there a face?  1: yes, 0: no
    | l1x
    | l1y
^   | l2x
y = | l2y
    | l3x
    | l3y
    | l4x
    [ l4y
```

### **Application for Landmark Detection**
1. AR augmented reality filters: like putting a crown on the face
2. key building block for computer graphics
3. People pose detections

### **Notice of Landmarks**
Landmarks should be consistent through all data sets. (e.g.: landmark 1 should always be left eye and landmark 2 shou always be right eye)

<br/>

## **Object Detection**
To do object detection, you need a conv net to recognize objects and an algorithm called 'Sliding Windows'.

---

### **One Object Detection in Each Cell**
#### **Sliding Windows detection**
1. Pick a small window size, start from left top corner, pass this rectangular window image to your ConvNet and make a prediction. 
2. Then slide the window a little bit over to right and feed that new region image into your ConvNet. 
3. Keep going until you slide the window through the entire input image.
4. Pick a larger window size, repeat steps above.

#### **Convolutional Sliding Windows**
Biggest disadvantage of sliding window algorithm: 

1. Computational Cost. (Much duplicated computations)
2. Position of bounding boxes isn't too accurate.

Method to fix the computational cost is called 'Convolutional Sliding Windows'.

##### **Turn FC layer into convolutional layers**
1. change each FC layer into _n_ filters (n refers to the number of units in this FC layer)
2. the size of each filter matches the size of the prior output.

##### **Convolution implementation of sliding windows**
1. Instead of feeding every region of the input into the ConvNet, you feed the entire original input image into ConvNet.
2. With turning FC layers into conv layers, every number of the final output represents the result of the relevant position window.
   ![Convolutional Implementation of Sliding Windows](/images/blog/screencatch/conv_implementation_sliding_windows.png "Convolutional Implementation of Sliding Windows")

Method to fix the position of bounding box is called 'YOLO algorithm'.

#### **YOLO algorithm**
1. Put a grid on the input image. (n * n grid)
2. For each grid cell, after running the object _classification and localization_ model, we get an output label y. (8-dimensions)
3. YOLO algorithm: take the midpoint of the object and assign the object to the grid cell which contains that midpoint.

##### **Define the Target y _(YOLO algorithm)_**
```python
    [ Pc
    | bx: mid-point of the bounding box [left top of the grid cell: (0,0), right bottom of the grid cell: (1, 1)]
^   | by: mid-point of the bounding box
y = | bh: ratio between the bounding box's height and the grid cell's height
    | bw: ratio between the bounding box's width and the grid cell's width
    | C1
    | C2
    [ C3
    
bx and by must be between 0 and 1, bh and bw could be between 0 and 1
```

##### **Notice of YOLO**
1. YOLO is like _classification and localization_ task before.
2. Using _convolutional implementation_, rather than feed each single grid cell separately into the ConvNet.
3. Works for real-time object detection.

##### **Paper**
You Only Look Once: Unified real-time object detection. (One of the harder to read)

#### **Intersection Over Union**
IoU could be used in both evaluating object localization and object detection algorithm.

##### **Evaluate Object Localization**
Intersection: size of the intersection between your bounding box and the ground truth box

Union: size of the union between your bounding box and the ground truth box

IoU = Intersection / Union, 'Correct' if IoU ≥ 0.5 (could also be '0.6', '0.7'...)

##### **Use in Object Detecting Algorithms**
IoU is also used in 'non-max suppression' and 'anchor boxes' algorithms.

#### **Non-max Suppression**
During the classification and localization task, it's common that the same object may be detected more than once. Since there are many gird cells say that they found an object.

That's the reason we need non-max suppression.

##### **Steps of Non-max Suppression _(Detecting Single Object)_**
1. discard all boxes with probability <= 0.6.
2. pick the box that has the _highest probability_ (kind of 'Pc'), which means '_the most confident one to have an object there_'. And this is one prediction. 
3. discard any other boxes that have a _high 'IoU'_ (like IoU >= 0.5) with the selected one above. 
4. if there are any remaining boxes, repeat from step 2.

##### **Notice of Non-max Suppression**
1. To detect _n_ objects, you need to run non-max suppression _n_ times.

### **Multi Objects Detection in Each Cell**
There are more than one objects in the same area, which means multi mid-points in one cell.

#### **Anchor Boxes**
Pre-defined multi different anchor boxes, called _anchor boxes_ and _anchor box shapes_. 

Each object is assigned to the grid cell that contains object's midpoint and _anchor box with highest IoU_.

> Compared to 'single object detection' before, the object will not only be assigned to the gird cell by location of its midpoint, but also assigned to the appropriate anchor box which has the highest IoU with this object. 
> 
> The object will be encoded in (grid cell, anchor box) in target label. 

##### **Example of Defining the Target Label y _(two anchor boxes)_**
```python
    [ Pc
    | bx: mid-point of the first bounding box
    | by: mid-point of the first bounding box
    | bh: height of the first bounding box
    | bw: width of the first bounding box
    | C1
    | C2
^   | C3
y = | Pc
    | bx: mid-point of the second bounding box
    | by: mid-point of the second bounding box
    | bh: height of the second bounding box
    | bw: width of the second bounding box
    | C1
    | C2
    [ C3
```

##### **Notice of Anchor Boxes**
1. Can't handle well in case that when you have _two anchor boxes_ and _three objects_ in one grid cell.
2. Can't handle well in case that when you have _two objects of similar shape's anchor box_ in one grid cell.
3. While choosing shapes of anchor boxes, the automatically and stereotypically representative method is _'K-means'_.

#### **YOLO with Components Above**
Here is the relatively complete YOLO algorithm:
1. put a grid on the input image and run convolution on the entire input image 
2. for each grid cell, we can get a target y with several anchor boxes
3. use non-max suppression _n_ times for _n_ classes (car, motorcycle, pedestrian..), get the final output

#### **Region proposal**
Try to just pick few regions that make sense (contain objects) to run convNet classifier.

Segmentation Algorithm: turn image into many blobs.

##### **R-CNN (Region-based Convolutional Neural Networks)**
Propose regions. Classify proposed regions _one at a time_. Output label + bounding box.

##### **Fast R-CNN**
Propose regions. Use _convolutional implementation_ of sliding windows to classify _all_ proposed regions.

##### **Faster R-CNN**
Use _convolutional_ network to _propose_ regions.

#### **Semantic Segmentation**
Label every single pixel to different classes.

---

##### **Difference between Object Detection and Semantic Segmentation**

 ![Object Detection vs. Semantic Segmentation](/images/blog/screencatch/object_detection_vs_semantic_segmentation.png) 

> _One of the usage is for self-driving car tasks to figure out which pixels are safe to drive._

##### **Segmentation with U-Net**

 ![What Segmentation Does](/images/blog/screencatch/what_segmentation_does.png)

Instead of giving a class label and coordinates specifying bounding box, segmentation algorithm _(U-Net)_ outputs a whole matrix of labels.

##### **Transpose Convolution**
Normal Convolution: _shrink_ the height, width and _expand_ the channel

Transpose Convolution: _expand_ the height, width and _shrink_ the channel

![Semantic Segmentation](/images/blog/screencatch/semantic_segmentation.png)

#### **U-Net**

 ![U Net](/images/blog/screencatch/U_Net.png)







**Reference:**
1. https://www.coursera.org/learn/convolutional-neural-networks/home/week/3
