---
title: TV Show Script Generation
description: 'Notes for NLP project Questions and Solutions 1. Llama2 Model takes more than 40G GPU RAM to train. Solution: LoRA: Low-Rank Adaptation of Large Language Models Concepts: Instead o'
date: '2025-03-27T16:23:17.000Z'
draft: false
heroImage: /images/blog/openai.jpg
showHeroImage: true
tags:
  - NLP
categories:
  - NLP
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Notes for NLP project~

## Questions and Solutions

### 1. Llama2 Model takes more than 40G GPU RAM to train.

Solution:
LoRA: Low-Rank Adaptation of Large Language Models

Concepts:
Instead of updating all params in the model, we add and update a low rank matrix to some weights matrixes (e.g.: Q, K, V matrixes in transformers)

The original weights matrix will be frozen and the low rank matrix will be trained and added to the weights matrix.

Method:
Use `LoraConfig` to add a LoRA adapter to the model. `LoraConfig` is integrated in `peft` by HuggingFace.

```python
from peft import get_peft_model, LoraConfig, TaskType

config = LoraConfig(
    r=8,
    lora_alpha=32,
    lora_dropout=0.05,
    bias="none",
    target_modules=["c_attn"],
    task_type=TaskType.CAUSAL_LM,
)
```

### 2.

## Reference

### “LoRA: Low-Rank Adaptation of Large Language Models”

#### “In self-attention layers, we only apply LoRA to the query and value projection matrices (i.e., W_q and W_v), since modifying the key matrix W_k is less helpful empirically.”

`target_modules=["q_proj", "v_proj"]`

#### $\Delta W = BA$

#### “For GPT-2 models, we set rank r=8 and scaling α=32 by default, unless otherwise stated.”

$r = 8, \alpha = 32$
