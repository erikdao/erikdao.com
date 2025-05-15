---
title: 'Managing Terraform in multiple environments'
date: '2025-05-15'
tags: ['dev', 'mlops', 'terraform']
featured: true
summary: "."
socialImage: '/images/dev/20250515_terraform_fb_img.png'
---

Managing Terraform states across different environments (like dev, staging, and prod) is critical for scalability, collaboration, and avoiding the dreaded "state file spaghetti." 😅 In this post, I'll share a few strategies I've used to manage Terraform states across multiple environments.

## Directory-based separation
Structure:
```shell
infrastructure/
├── dev/
│   └── main.tf
├── staging/
│   └── main.tf
└── prod/
    └── main.tf
```
## Workspace-based separation

## Terraform modules + environment configurations

## Terragrunt