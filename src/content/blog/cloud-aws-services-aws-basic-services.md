---
title: AWS Basic Services
description: Basic Services in AWS IAM (Identity and Access Management) 1. users & groups management 2. Access to AWS AWS Management Console (Through Browser, username + password + MFA) AWS Com
date: '2025-06-02T16:08:04.000Z'
draft: false
showHeroImage: false
tags:
  - AWS
categories:
  - AWS
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

Basic Services in AWS~


## IAM (Identity and Access Management)
1. users & groups management
2. 

## Access to AWS
### AWS Management Console (Through Browser, username + password + MFA)

### AWS Command Line Interface (CLI, Through custom terminal, access keys needed)
CLI open-source application: https://github.com/aws/aws-cli.

### AWS Software Developer Kit (SDK)


## AWS EC2
### Security Groups

### Use SSH access an EC2 instance


## AWS EBS (Elastic Block Store)
1. EBS Volumes: Act as network drives which can be attached to EC2 instances, allowing for persistent storage of data.
2. Data Persistence: Data is retained after EC2 instance is terminated.
3. Single Instance Mount: An EBS volume can be mounted to only 1 instance within the
   same EC2 Consolidated Billing family.
4. Availability Zone Specific: Each EBS volume is tied to a specific Availability Zone.
![img.png](/images/blog/cloud-aws-services-aws-basic-services/img.png)


### EBS Snapshots
Snapshots serve as a backup for an EBS volume at a certain point in time, ensuring data won't lost.
![img_1.png](/images/blog/cloud-aws-services-aws-basic-services/img_1.png)


### EBS Snapshots Archive
![img_2.png](/images/blog/cloud-aws-services-aws-basic-services/img_2.png)

> This feature allows users to move less frequently accessed snapshots to an archive tier, which costs 75% less than the standard snapshot storage tier. 
> The archived snapshots take from 24 to 72 hours to restore, indicating that this option is suited for backups that are not expected to be needed for immediate recovery.


### Recycle Bin for EBS Snapshots
![img_3.png](/images/blog/cloud-aws-services-aws-basic-services/img_3.png)

> A recycle bin can be set up for EBS snapshots to retain deleted snapshots for a certain period, which can range from 1 day to 1 year.
> This provides a safety net allowing for the recovery of snapshots that may have been accidentally deleted.


## Amazon Machine Images (AMIs)
AMIs is a customization of an EC2 instance, which includes user-defined software, configurations, and the operating system. (could be copied to other regions)
![img_4.png](/images/blog/cloud-aws-services-aws-basic-services/img_4.png)


### EC2 Image Builder
Automating the creation, maintenance, validation, and testing of EC2 AMIs.
![img_5.png](/images/blog/cloud-aws-services-aws-basic-services/img_5.png)


## Amazon Elastic File System (EFS)
EFS is a managed file storage service provided by AWS. It operates as a managed Network File System (NFS) that can be attached to **multiple** EC2 instances across **different** Availability Zones.
![img_7.png](/images/blog/cloud-aws-services-aws-basic-services/img_7.png)

* EBS is depicted as a storage volume that's available within a single Availability Zone. Data persistence is handled through snapshots, which can be used to restore data. The snapshot feature allows the creation of a point-in-time copy of an EBS volume, which can be used for backups or to create new volumes. 
* EFS is shown as a network file system that spans multiple Availability Zones, providing a higher level of availability and redundancy. EFS volumes are mounted on EC2 instances as network drives, and the same file system can be accessed by multiple instances simultaneously, which is not possible with EBS.

Main Points between EBS and EFS
> Availability Zone Restriction: EBS -> single Available Zone, EFS -> across multiple Availability Zones
> Mounting: EBS attached to individual EC2 instances, EFS mounted on many EC2 instances (shared file system).
> Data Backup and Recovery: EBS relies on snapshots for data backup, EFS doesn't require snapshots.
