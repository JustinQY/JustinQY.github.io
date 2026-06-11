---
title: Co-op Interview Prepare
description: Interview preparation for 2025 September co-op positions. Government of Ontario - Data Engineer (Co-op) SQL ETL 1. What's ETL? ETL is Extract , Transform and Load . It’s the most i
date: '2025-07-01T16:30:16.000Z'
draft: false
showHeroImage: false
tags:
  - Interview
categories:
  - Interview
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Interview preparation for 2025 September co-op positions.

# Government of Ontario - Data Engineer (Co-op)

## SQL

## ETL

1. What's ETL?

   > ETL is **Extract**, **Transform** and **Load**. It’s the most important part in Data Engineer process.

2. What's ADF? Can you make an example?

   > ADF is **Azure Data Factory**, it's used to construct and dispatch an ETL process. It allows us to extract data from multiple sources, clean, transform and load to the target systems (like Azure Data Lake).
   > An Example for ETL: Extract CSV files from Azure Blob Storage, clean missing values and outliers, then save the cleaned data into Azure SQL Database for visualization by other teams. We can build an ADF pipeline to handle this process.
   > Comment: reusable pipeline

3. Do you know Databricks? Why should you use Spark?

   > Databricks is a uniform platform for data analysis, it's built based on Spark. It can handle large-scale data processing, data cleaning and machine learning tasks.
   > Compared to traditional database, Spark is better at handling big data,
   > One of the biggest advantages of using Databricks is its interactive Notebook interface. We can deal with ETL process, SQL coding and model training more efficiently with the parallel ability of Spark.

4. What is Parquet? When to use Parquet instead of CSV?

   > Parquet organizes data by columns, CSV stores data by rows.
   > Parquet is also more suitable for distributed systems, while CSV is better suited for simpler, smaller datasets.

5. Explain a classic data processing flow: Load from CSV, data cleaning, write into a database.
   > Like a classic ETL process:
   >
   > - Extract: Read data from CSV files
   > - Transform: Use pandas to do data cleaning
   > - Load: Write cleaned data into the target system, like Azure SQL Database / Azure Data Lake.

## Project Experience

## Prepare questions according to JD

1. Strong analytical skills to identify, retrieve, evaluate data.

   > In my recent projects, I worked a lot with data using Pandas—like filling in missing values, detecting outliers, and doing feature engineering and scaling through EDA.
   > I also spent time validating the model results to make sure the outputs made sense and matched what I expected from the data.

2. Knowledge of Agile Methodologies.

   > I have solid experience of agile development.
   >
   > In my previous career, one big part of my daily work content is collaborating with cross-functional teams, including PM, QA, UI and backend.

3. Strong communication skills (both oral & written) to present/relay information, provide updates etc. in a clear and concise manner.

   > In my previous career, I had group meetings with my colleagues every morning to align the progress on our projects
   >
   > At the beginning of each requirement, I always wrote and updated the requirement documents to record technical plan and details.

4. Strong problem-solving skills to work with and support the team with identifying issues and solutions for recommendation.

## Story Preparation

### Story 1 (Collaborate, Conflict, Disagreement)

There was a time when I was in the programming competition with my teammates.
For a hard question, we got different thoughts of solutions and couldn't agree with each other.
That's a time-limited competition, and the teams solved more tasks within less time get better grade.
So I first calmed myself down, tried to understand clearly what his idea was.
We walked through his idea briefly and found out it actually couldn't solve the question.
Then I explained my chain of thought to this question and proved it worked.
Finally, we implemented the idea together and successfully solved this problem.
And this helped us win the bronze medal in the end.

### Story 2 (**Time-limited, Challenge Yourself, Get over Hard Task, Analyze and Solve Step by Step, the Most Fulfilling Thing**)

There was a time when I was asked to refactor the unit test system for one important live-streaming framework in 2 months.
The hardest part is, the framework is pretty abstract and there isn't any technical document, which made it tough to understand.
And the previous design wasn't clear or concise, many functions had problems with improper names, unclear annotations and no return values.
To make sure the task would be finished on time,
I first spent the first month ramping up the whole framework carefully and building detailed documents to clarify the framework structure. Then I fixed all problematic functions.
After these preprocessing works, I spent the second month redesigning and developing the unit test cases.
Finally, the refactored unit test system has reached over 97% coverage of the whole framework, compared to 40% previously.

### Story 3 (Failure, Wrong, Remedy Mistakes)

There was a time when I've started my first job for 3 months. I was assigned a project, and was asked to give a precise schedule.
At that time, due to the lack of experience and underestimating the complexity of the project, I gave an over-positive schedule and didn't seek double review from my colleagues.
But when halfway through the project, I found it more complicated than I expected: my project was associated with many other projects, and I need to make sure my changes won't affect them.
To remedy this mistake, I first immediately reported a risk of delay to my manager. Then I quickly listed all affected projects and ramped them up by taking meetings with their owners.
Finally, I finished the project with a delay of 2 days.
From this mistake, I learned that I should think broader and try to cover any possible details.
If necessary, I should also reserve meetings with my colleagues to double-confirm the plan.

### Story 4 (initiative to solve problems, leadership, invented something)

There was a time I was on my first job. I was assigned a project to add some new widgets from different business teams to user's screen during live-streaming.
But with the limited screen size, it would badly hurt users' experience if I show these widgets at the same time.
So I decided to think about a more efficient way to not only save screen size, but also show all widgets.
After a time of deep thinking and experiment, I came up with a carousel component which could show each widget sequentially and repeatedly by fixed time interval.
Then I suggested this idea to project manager and tech leader with a demo. They agreed with this approach.
Finally, I successfully developed this carousel component and made all stakeholders satisfied. After several months, this design was published as a patent.
