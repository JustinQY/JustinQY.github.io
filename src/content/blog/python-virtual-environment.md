---
title: Python Virtual Environment
description: Python Venv 搭建个人python虚拟环境 --- 新建一个文件夹目录, 假设叫做“deeplearning”. 执行 python3 -m venv venv , 第一个“venv”表示创建virtual environment, 后面的“venv”表示环境文件夹命名. 执行 source venv/bin/activate 以激活python虚
date: '2025-01-27T10:32:14.000Z'
draft: false
heroImage: /images/blog/pythonlanguage.jpg
showHeroImage: true
tags:
  - Python
categories:
  - Python
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Python Venv


## 搭建个人python虚拟环境

---

* 新建一个文件夹目录, 假设叫做“deeplearning”.
* 执行 `python3 -m venv venv`, 第一个“venv”表示创建virtual environment, 后面的“venv”表示环境文件夹命名.
* 执行 `source venv/bin/activate`以激活python虚拟环境, 回车后看到后续命令行内容中包含(venv)表示已经成功进入python虚拟环境.

## python虚拟环境安装jupyter

---

* 安装 Jupyter
```shell
pip install notebook jupyterlab ipykernel
```

* 安装 IPython 内核
```shell
pip install ipykernel
```

* 添加虚拟环境及内核到 Jupyter
```shell
python -m ipykernel install --user --name=myenv --display-name "Python (myenv)"

myenv: 对应自己环境名称修改
```

* 从已有环境导出package list, 并在虚拟环境安装该package list
```shell
pip freeze > requirements.txt 

pip install -r requirements.txt
```

## 软链接和硬链接
 
---

### Hard Link (硬链接)
硬链接是文件系统中的一个直接指针，多个硬链接共享同一份文件数据。
```shell
ln 源文件 链接名称

ln file.txt file_hardlink.txt
```

### Symbolic Link (软链接)
软链接类似于快捷方式，指向源文件的路径，而不是文件数据本身。
```shell
ln -s 源目标target 链接名称

ln -s /usr/local/bin/python3 /usr/bin/python3
```

#### 替换系统默认的Python3符号链接
