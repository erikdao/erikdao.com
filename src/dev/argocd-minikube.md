---
title: 'Setting up ArgoCD for Local Development with Minikube'
date: '2025-06-19'
tags: ['dev', 'argocd', 'minikube']
featured: true
summary: ""
socialImage: '/images/dev/20240605_iterm2_fb_img.png'
---
In this post, I'll walk you through how to setup ArgoCD for local development with Minikube.

## Prerequisites

- Minikube installed
- ArgoCD installed
- Kubernetes cluster running

Start a local Kubernetes cluster with Minikube:

```bash
minikube start --driver=docker
```

## Install ArgoCD

It's quite simple to install ArgoCD. Just run the following command:

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```


## Install ArgoCD CLI
