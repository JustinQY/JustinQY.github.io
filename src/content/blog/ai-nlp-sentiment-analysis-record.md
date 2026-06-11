---
title: Sentiment Analysis Task Notesß
description: Recording a task to solve a movie comment sentiment analysis task Data Preprocessing Dataset downloading Download movie comments dataset (IMDb) from Hugging Face Data Cleaning Part
date: '2025-03-18T22:36:26.000Z'
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

Recording a task to solve a movie comment sentiment analysis task~

# Data Preprocessing

## Dataset downloading

Download movie comments dataset (IMDb) from Hugging Face

```python
dataset = load_dataset("imdb")
```

## Data Cleaning

Part of the data processing. Remove the useless characters.

```python

```

## Tokenize the data

### Load a tokenizer (pretrained)

### tokenize and transform the data

## Split the data into training set, validation set and test set

## Transform the dataset to DataLoader

---

### Create specific dataset class (inherit 'Dataset')

```python
class SentimentDataset(Dataset):
    def __init__(self, dataset):
        self.dataset = dataset


    def __len__(self):
        return len(self.dataset)


    def __getitem__(self, idx):
        item = self.dataset[idx]
        inputs_ids = torch.tensor(item["input_ids"], dtype=torch.long)
        attention_mask = torch.tensor(item["attention_mask"], dtype=torch.long)
        label = torch.tensor(item["label"], dtype=torch.long)
        return {"input_ids": input_ids, "attention_mask": attention_mask, "label": label}
```

### Create DataLoader (convenient for batch training)

# Load and Fine-Tune a Pretrained Model

## Load a pretrained transformer model

```python
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-based-uncased",
    num_labels=2,
    hidden_dropout_prob=0.4,
    attention_probs_dropout_prob=0.4
)
```

## Fine tune the model

### Training Arguments Setting

```python
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    save_strategy="epoch",
    logging_strategy="steps",
    logging_steps=10,
    learning_rate=5e-6,  # 进一步降低学习率
    per_device_train_batch_size=4,  # 降低 batch size
    per_device_eval_batch_size=4,
    gradient_accumulation_steps=2,  # 让梯度累积，等效 batch_size=8
    num_train_epochs=2,  # 降低 Epochs，避免过拟合
    weight_decay=0.1,  # 增加权重衰减
    logging_dir="./logs",
    report_to="none",
    load_best_model_at_end=True  # 解决 EarlyStoppingCallback 报错
)
```

### Trainer Setting

```python
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    tokenizer=tokenizer,
    callbacks=[EarlyStoppingCallback(early_stopping_patience=1)]  # 提前终止训练，避免过拟合
)
```

### Train the model

```python
trainer.train()
```

# Evaluate the Model

## Confusion Matrix

### Compute metrics

Define function to compute: Accuracy, Precision, Recall, F1

```python
def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    accuracy = accuracy_score(labels, preds)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average='binary')
    return {"accuracy": accuracy, "precision": precision, "recall": recall, "f1": f1}

eval_results = trainer.evaluate()
```

### Plot Confusion Matrix

## Visualize Classification Report

## Visualize the Training Loss and Validation Loss
