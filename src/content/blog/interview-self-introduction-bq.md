---
title: Self Introduction & BQ Questions
description: 'Interview preparation Self-Introduction Before graduates and during graduates. Behavior Situations Won a bronze medal in a programming competition with teammates Fit questions: tea'
date: '2025-10-29T16:29:04.000Z'
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

Interview preparation~



## Self-Introduction
Before graduates and during graduates.


## Behavior Situations
### Won a bronze medal in a programming competition with teammates
> Fit questions: team work, overcome a hard problem through team cooperation. Leadership

### Led and Refactored the unit test system for one important framework
> Fit questions: Personal ability, met a hard task and how to solve. Professional

### Project delay due to lack of experience, then controlled the risk and remedied the problem
> Fit questions: Have you ever caused a problem and how you fix it? Reflection

### Given the current situation, proposed a better solution and successfully deployed
> Fit questions: Have you ever improved the system? Self-motivation


## Ground News Interview Preparation
I'm not only proficient in development, but I can also help Ground News find the balance between user experience and engineering stability.


### Walk me through your background? (Introduce yourself)
Hi, my name is Gary Qiao, and I'm now a graduate student from McMaster University.

Before that, I've worked as an iOS developer in Baidu and Kuaishou for 3 years,
where I focused on feature development and performance optimization for large-scale apps with over 4 hundred million users.

This has made me proficient with iOS app development, agile development and cross-functional teams collaboration.

Now I’m looking for an opportunity to apply my professional experience to a mission-driven product,
and Ground News really stands out to me for how it helps people see multiple sides of the stories happened around the world.


### Why are you interested in Ground News?
What really attracts me is the mission: anti-bias, anti-algorithm recommendation and encourage users to think freely.

I think it’s incredibly meaningful, especially in a world where algorithms often shape what we see and how we think.

From a technical point of view, I'm really excited to help build a smooth, transparent and trustworthy mobile experience on the Ground News app.


### How do you usually collaborate with designers or backend engineers?
I'm happy to share that.

During my past work time, I collaborated with designers and backend engineers daily. 

I usually schedule quick syncs to clarify requirements before I get started, then iterate in small, reviewable steps. 
This makes sure we are always on the same page of the requirement.

At Baidu, for example, I often worked closely with designers to optimize UI transitions:
The collaboration is necessary because small adjustments like page lazy loading and image async loading made a big difference in both performance and user experience.


### Can you tell me about a challenging project and how you solved it?
Sure. One of the most challenging projects I worked on was improving the unit test coverage for a core live-streaming framework at first company.

When I was assigned the project, the test coverage was actually only around 40% and most of the validation relied on manual testing.

I spent about a month reviewing the entire codebase and documenting its structure to fully understand the dependencies.
Then I designed a development plan to systematically cover all the classes and applied (test driven development) principles during implementation,
which also helped improve the framework by refactoring some bad functions.

In the end, I achieved over 97 % of unit test coverage on the framework and reduced manual testing workload by roughly 60%.

It was challenging because the codebase was large and had little documentation, 
but it taught me how to approach complex systems in a structured and scalable way.

### Tell me about a time you had to learn something quickly.
When my team decided to explore SwiftUI and Combine for a new feature, I had very little experience with them.

I spent about a week going through Apple’s documents and writing small demos to practice these new skills. 
I also watched some well-explained videos on YouTube to strengthen my understanding. 
Within two weeks, I successfully built a working component that replaced our old UIKit version.

That experience taught me how to learn new things fast and deploy it on my real work quickly.


### What motivates you as an engineer?
I'm motivated by building products that make positive effects on people's daily life.

And I'm delighted to know that the features I delivered help people think wider and deeper.

Besides, I love solving technical problems, which gives me the sense of achievement.


### How do you deal with bias or different opinions in a team?
To deal with bias, I always try to give respect to others first, start from facts and shared goals instead of personal preference.

If there's a disagreement, I like to prototype both options quickly and compare results, which could keep discussions objective.

In my experience, most conflicts disappear once everyone sees real metrics or user feedback.



### Do you have any questions for us?
Yes, I have a couple of questions.

1. How will the iOS team measure success? Is it more about user engagement, app performance or release velocity?
2. I just wanted to check on your expected start timeline for this role. If I'm selected, 
the earliest I could start full-time would be around early May 2026, would that fit the team and your expectation?



## Capital One
---
### 1. Describe a situation in which you were able to use **persuasion** to successfully **convince someone** to see things your way.
### 3. Tell me about a time when you had to use your **presentation** skills to **influence someone’s opinion**.
(S/T)
There was a time when I was in a **programming competition** with my teammates. We got stuck on a problem and had different thoughts about it. 
I believed mine was correct, but he insisted on implementing by his way.

It's a **limit time competition** and the faster you solve the problem, the better prize you get. So I need to figure out a solution to **convince him**.

(A)
I **first** invited him to **walk through his approach** together quickly. And he realized he **misunderstood and overthought the problem**. 
His method was too complicated and wouldn't work for this problem. So there was no reason he continued to insist on his idea.

Then I suggested that we could **go through mine method**, which is a simpler way based on a correct understanding of this problem.
He agreed, and after this we both find mine method would work great for this question.

(R)
Then we implemented it together and collaborated to solve some other problems. Finally, we got a **bronze medal** in that competition.

The **lesson** I learnt is that **a good way to convince/influence** someone is to **actively solve his concern**. 
Then he would be much more willing to see things in your way.


---

### 2. Give me a specific example of a time when you used **good judgment and logic** in solving a problem.
### 9. Give me an example of a time when you used your **fact-finding skills** to solve a problem.

(S/T)
There was a time during my first job; I was assigned a **bug**, which led **live-streaming stuttering**. 
The biggest problem was: the **business was complicated**, and there are **hundreds of thousands of codes** associated with the whole live-streaming scenes.

(A)
To solve this problem **efficiently**, I first tried to **reproduce the issue and located** it.
Then I found it **always happened** after user did **some specific operations**.
So I successfully **reduced** the **range** of the problem from the whole live-streaming scene **into a small specific sub scene**.

Then I run the **XCode Instruments** tool, did the operation chain above and found there was 
**an animation function** caused **much time on the main thread**.
So I figured out the problem was someone tried to perform a **time-consuming operation** on the main thread.

(R)
Then I optimized the codes by **moving the logic** to **sub thread** and fixed the problem.
From this case, I learned that it's always helpful to troubleshoot a problem if I **logically** analyze it and reduce the range to a small one.

---

### 4. Tell me about a time when you had to **go above and beyond** the call of **duty** to get a job done.
### 6. Give me an example of when you showed **initiative and took the lead**.
(S/T)
There was a time when I was assigned a project to **improve the exposure** of many businesses by 
**adding widgets to the screen**.

The project manager gave me a **UI design plan**, but I thought there was **something** I could help 
to **improve**.
Because **too many widgets** of all the businesses would **cover much of the content**, 
and it would **badly hurt** the users' **experience**.

(A)
So I **browsed many other similar apps** and tried to find if there is any situation like ours. 
And I came up with **a better way** to redesign this requirement: it's to use a **carousel widget** to 
show all the businesses **repeatedly**, each business has the same time duration.
The **good thing about this** is it only takes **one widget space** on the screen, but **users could see all** businesses through this widget.

(R)
Finally, I helped redesigned the UI with project manager and UI colleagues. And **successfully increased the exposure** of all business according to their feedbacks.
And this approach was also **published as a patent**.

From this project, I learned that as a **programmer**, my **duty** is **not just developing and delivering** features.
Help **make the application more user-friendly** sometimes has the same importance, and I should **take the lead bravely** to achieve that. 

---
### 5. Tell me about a time when you had **too many things to do** and you were required to **prioritize** your tasks.
(S/T)
There was a time when I had **one feature to development and several bugs to fix** at the **same time**. They all had **different due** days.
So it's important to **handle every task carefully** and make sure each of them was on its track.

(A)
So I first had a **meeting** with **my manager and the project manager**, to **confirm their expectations** for all tasks.
Then, according to their expectations, I **made a list to prioritize** all tasks from the most important to the least.
For the **feature development**, it got the **highest** priority, so I spent **80% of my time** to make sure it'll be finished and deployed by the due date.
For the **bugs**, I used the **rest 20% of my time to fix them one by one**, and let the manager and project manager know **that some of them needed to be delayed** to the next release.

(R)
Finally, the **deliverables** successfully **met** my manager and the project manager's **expectations**, even some bugs didn't get fixed in that version.
From this case, I learned that if you **got assigned many tasks** at the same time and there is **a risk to finish all of them**,
you should **immediately communicate** with all the **stakeholders** to get their **expectations** and handle tasks **based on their priorities**.

---

### 7. Give me an example of a time when you **motivated others**
### 8. Describe a time when you anticipated **potential problems** and developed **preventive measures**.
(S/T)
There was a time when I was assigned a project to **refactor the unit test system** for a **core live-streaming framework**.
The biggest challenge of this framework is the **codebase is large** and **complicated**, so it's **hard to understand and maintain**.
After researching and developing for 2 months, I redesigned and finished the whole unit test cases, achieved over 97 % of code coverage. The unit test cases could take over 60% of manual testing on this framework for that time.
But the **potential problem still remains**. In the future, **after several iterations**, the framework will **get larger** and **still need to redesign the whole unit test system**,
which is **not a good practice** in the software industry.

(A)
What I did was **raised this point** during the report of the unit test refactor meeting. And **suggested developers** who were associated with this framework to use **TDD principle** to develop new features.
**Test-driven development** means developers should **start from writing unit test cases** before they **implement functions**.
This will bring us a **benefit** that developers could **use unit testing** to **reinforce coding standards and quality**, so the framework codebase **won't get worse easily** after iterations.

(R)
After that, **my manager agreed** with my approach, and **other developers were encouraged** by my opinion. 
I successfully **prevented the code degradation issue** by **motivating others to use TDD** principle. 
This task made me realize that you should **be active to identify improvements** in the project, and **encourage others to follow** you to make the whole project better.

---
