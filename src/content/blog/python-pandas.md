---
title: Pandas
description: 'Applications in pandas "pandas is kind of excel in python" 1. Dataframe 2. Dataframe to numpy: df.to numpy() 3. Numpy to Dataframe: df = pd.Dataframe(array) 4. drop some columns: 5'
date: '2025-01-27T10:40:54.000Z'
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

Applications in pandas

"pandas is kind of excel in python"

1. Dataframe
   ```python
   # 创建一个示例 DataFrame
   df = pd.DataFrame({
   'A': [1, 2, 3],
   'B': [4, 5, 6]
   })
   ```
2. Dataframe to numpy:
   `df.to_numpy()`
3. Numpy to Dataframe:
   `df = pd.Dataframe(array)`
4. drop some columns:
   ```python
   # drop by column name list
   column_list = ['1', '2', '3']
   df = df.drop(column_list, axis=1) # drop some columns
   ```
5. rename column:

   ```python
   # rename by column name:
   df.rename(columns={"A":"a", "B":"b"})

   # rename by index
   df.rename(index={0: "x", 1: "y"})
   ```

6. get column name list:
   ```python
   column_list = df.columns # return "Index['column1', 'column2'...'column10']"
   ```
7. get continuous part of dataframe

   ```python
   df_part1 = df.iloc[:, :6] # first 5 columns of df

   df_part2 = df.iloc[:5, :] # first 5 rows of df

   df_index = df.iloc[1, 2] # element at index (1, 2)
   ```

8. modify a column

   ```python
   df['column_name'] = df['column_name'].map({'ClassA': 1, 'ClassB': 2}) # mapping Label to Number

   df['column_name'] = df['column_name'].map(lambda x: x * 2) # mapping element using lambda
   ```

9. form a dataframe by multiple arrays

   ```python
   df = pd.DataFrame({
      'Column1': array1,
      'Column2': array2
   })
   ```

10. data frame concat

```python
feature_list = df.columns
new_df = df[feature_list[0:3] + [df.columns[-1]]]

```
