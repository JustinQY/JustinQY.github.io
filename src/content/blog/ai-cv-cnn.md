---
title: CNN
description: 'Delete after finish YOLO algorithm. 1. convolution (asterisk) 2. filter(kernel) 3. image filter = new image 4. python: conv forward, tensorflow: tf.nn.con2d, keras: conv2D 5. edge'
date: '2024-12-09T15:51:33.000Z'
draft: false
heroImage: /images/blog/tesla.jpg
showHeroImage: true
tags:
  - CV
categories:
  - CV
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Delete after finish YOLO algorithm.


1. convolution *(asterisk)
2. filter(kernel)
3. image * filter = new image
4. python: conv_forward, tensorflow: tf.nn.con2d, keras: conv2D
5. edge detection (vertical && horizontal) 
6. filter can distinguish whether the input image is 'light to dark' or 'dark to light'
7. different numbers used in filters (sobel, Scharr)
8. learn numbers in filter by backprop
9. filter 'f' is usually odd(3 x 3, 5 x 5, 7 x 7)
10. padding: pixels on the corners and edges used much less than the middle: problems:1.shrinking output 2.throwing away information from edges of the image
11. padding choices: valid(no padding) and same(pad, so output size is same as input size)
12. stride convolutions: steps the filter moves
13. new output dimension: floor[(n + 2p - f) / s] + 1
14. convolutions over volumns(3 channels): input image: n*n*n_channels , filter: f*f*3, output: 1 volumn(no longer 3)
15. filter f*f*3 can detect edge of different color(red/green/blue channel)
16. using multiple filters in the same time: output dimension: n_new*n_new*n_filters
17. types of layers in cnn: Conv layer, Pooling Layer, Fully-Connected Layer
18. Pooling(no params to learn): Max Pooling(usually not use padding) - biggest number, Average Pooling
19. LeNet-5 (conv-pool, conv-pool, fc, fc), AlexNet, VGG-16
20. Residual NN(skip connection/short cut: residual block)
21. why Residual NN works? identity function is easy for residual block to learn
22. turn a plain NN to a residual NN: add residual blocks(skip connections)
23. 1*1 convolution(one-by-one convolution/network in network)
24. inception network/inception layer: use them all! Question: computation cost (fix: using one-by-one convolution to shrink the channel of the input)
25. MobileNet v1 (depthwise separable convolution: depthwise + pointwise)
26. Depthwise Convolution(number of filters = number of channels, filter size: f * f)
27. Pointwise Convolution / Projection (filter size: f * f * n_channel)
28. MobileNet v2 (2 main changes: 1.add Residual Connection 2.add expansion layer -> bottleneck block)
29. EfficientNet (limited computational resource: how to trade-off between resolution of the input image, depth of the network and width of the layers)
30. Open-Source implementation
31. Transfer Learning (always try when doing computer vision) (freeze layers in others' projects, the larger dataset you have for your task, the fewer layers you freeze, the more layers you train)
32. data augmentation (Common Used: Mirroring, Random Cropping, Color shifting Less Used: Rotation, Shearing, Local Warping)
33. PCA Color Augmentation
34. implementing distortions during training (have multiple threads to load and implement distortions and pass the results to other threads to train)
35. Tips for doing well on benchmark/competitions (1.Ensembling: train several nets independently and average their outputs 2.Multi-crop at test time: run classifier on multiple versions of test image and average results)
36. object detection: object classification + object localization(landmark detection) = object detection
37. algorithm for object detection: sliding windows. train a CNN to classify entire cars in image, then go sliding windows in original input, pass the crop window image to that CNN to check if there is a car. After go through the entire input image, make the window larger and repeat.
38. problem for sliding windows: 1.huge computational cost. fix: use that algorithm 'convolutionally' 2.position of the bounding boxes aren't too accurate. fix: YOLO algorithm(making grid for input images and label the training data with 8 dimensions: [Pc, bx, by, bh, bw, c1, c2, c3])
39. YOLO(you only look once) algorithm
40. how to tell if your object detection algorithm is working well? using: intersection over union(IOU): size of intersection(交集) / size of union(并集), correct if Iou >= 0.5(threshold), Iou is a measure of the overlap between two bounding boxes
41. Object Detection Problems: 1.make sure object detection algorithm detect each object only once: non-max suppression: 1.discard all boxes with pc <= 0.6(threshold, means there isn't any object) 2.while there are any remaining boxes: pick box with the largest pc, output as a prediction, then discard any remaining box with Iou >= 0.5 wit the box you just output as a prediction
42. Object Detection Problems: 2.each of the grid cell can only detect one object(also called 'overlapping objects'): anchor boxes: pre-define two(or more) different shapes(called 'anchor boxes') and reshape the label y (maybe from 8 dimensions to 16 dimensions because of two anchor boxes)
43. YOLO algorithm: put them together: For training set: y is containing two(or more) anchor boxes(two anchor boxes: [pc bx by bw bh c1 c2 c3 pc bx by bw bh c1 c2 c3]) For making predictions: pc == 1 means this anchor box contains the object. Run non-max suppression: choose the highest 'pc'(probability) predictions, for each class, run non-max suppression to generate final predictions
44. Region Proposals: R-CNN(regions with convolutional neural networks): to run your convolutional classifier on several regions: 1.run segmentation algorithm to determine some blobs(颜色区域) that maybe an object 2.then run convolutional classifier on these blobs. (R-CNN -> Fast R-CNN -> Faster R-CNN)
45. Semantic Segmentation: label every single pixel: semantic segmentation with U-Net(compared to CNN for object recognition, in the U-Net, the width and height first get smaller, then they need to get bigger to blow it back to a full-size image: using transpose convolutions)
46. transpose convolution: set filter to output (not input), use padding and stride to output
47. U-Net:
