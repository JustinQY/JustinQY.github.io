---
title: Objective-C
description: 'OC Objective-C 程序的编译过程 通过命令查看某个OC源文件编译过程: clang -ccc-print-phases xxx.m Clang前端处理 1. Lexical Analysis (词法分析) 2. Grammatical Analysis (语法分析) 3. Semantic Analysis (语义分析) 4. Intermedi'
date: '2024-10-17T15:17:29.000Z'
draft: false
showHeroImage: false
tags:
  - iOS
categories:
  - iOS
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

OC


## Objective-C 程序的编译过程
通过命令查看某个OC源文件编译过程: `clang -ccc-print-phases xxx.m`

### Clang前端处理
1. Lexical Analysis (词法分析)
2. Grammatical Analysis (语法分析)
3. Semantic Analysis (语义分析)
4. Intermediate representation (中间代码生成)

### LLVM后端处理
1. Generate machine language

### 预处理 processing

### 编译 Compilation

### 汇编 Assembly

### 链接 Linking

### 运行时处理 Runtime Handle

### 参考文章
1. [iOS编译过程的原理和应用](https://github.com/LeoMobileDeveloper/Blogs/blob/master/iOS/iOS%E7%BC%96%E8%AF%91%E8%BF%87%E7%A8%8B%E7%9A%84%E5%8E%9F%E7%90%86%E5%92%8C%E5%BA%94%E7%94%A8.md)
2. [Objective-C源文件编译过程](https://cloud.tencent.com/developer/article/1520878)
