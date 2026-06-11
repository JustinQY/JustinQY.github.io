---
title: FastAPI and Docker
description: Recording the progress of deploying the NLP project by fastAPI, docker and streamlit. FastAPI Create an api for others to use to generate scripts by sending a prompt. 1. Create a n
date: '2024-10-17T15:17:29.000Z'
draft: false
showHeroImage: false
tags:
  - BackEnd
categories:
  - BackEnd
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Recording the progress of deploying the NLP project by fastAPI, docker and streamlit.

## FastAPI

Create an api for others to use to generate scripts by sending a prompt.

1. Create a new project of `app`.
2. Write codes needed to handle the inputs by users.
3. Start the api by `uvicorn <filename>:app --reload`. (Run this under the dir of `app.py`)

```python
from fastapi import FastAPI

app = FastAPI()

# define the input type class
class InputClass {
    prompt: str
}

@app.post('/generate')
fun generate_script(input: InputClass):
    # deal with the input

```

## Docker

Use docker to pack the fastAPI and project.

1. Derive the `requirement.txt` file.
2. Create the `dockerfile`.
3. Set up the `docker mirror`.
4. Run the docker container (local).

```python
# 1.derive requirement.txt
pip freeze > requirements.txt

# 2.create dockerfile
# 使用官方 Python 镜像
FROM python:3.9-slim

# 设置工作目录
WORKDIR /app

# 拷贝依赖和代码
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# 启动 FastAPI 服务
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

# 3.setup docker mirror
docker build -t fastapi-llama-app .

# 4.run container locally
docker run -p 8000:8000 fastapi-llama-app
```
