---
title: 'MLFlow on GCP Part 1 - Scalable and Reproducible Deployment with Terraform'
date: '2024-07-06'
tags: ['machine learning', 'mlops', 'mlflow']
featured: true
summary: ""
socialImage: '/images/machine-learning/20240706_mlflow_on_gcp_fbog_img.png'
---

Do you and your team love MLFlow - the leading open-source tool for managing the lifecycle of your ML project? If you're reading this page, the answer is probably *yes*. As your ML projects and team grow, so does the need for seamless collaboration in tracking experiments and testing new ML models. That’s why you need a scalable MLFlow setup that allows:

* Data scientists and ML engineers in your team to easily track and share experiments
* You, as an MLOps engineer, to quickly spin up or tear down the setup in various environments.

In this post, I'm going to show walk you through deploying MLFlow on GCP with Terraform. By the end of this article, you'll be able to 

* Set up a scalable deployment of MLFlow on GCP.
* Manage your deployment with Infrastructure as Code (IaC) using Terraform, tracked in a Git repository, so you can replicate the setup in different environments like development and production effortlessly.

Let's dive in!

## Architecture overview

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20240706_mlflow_on_gcp_architecture.png" alt="Architecture of MLflow on GCP setup">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">Components of MLflow on GCP setup</figcaption>
</figure>

Our MLflow on GCP setup includes
* **Cloud Build**: to build the MLflow docker image from a `Dockerfile` in our code repository
* **Artifact Registry**: hosts the docker image above in a repository that can be pulled by Cloud Run
* **Cloud Run**: to deploy our containerized MLflow server in a scalable way
* **Cloud Storage**: contains the bucket that MLflow stores its artifacts, including, model checkpoints, etc.
* **Cloud SQL**: hosts the PostgreSQL database that MLflow stores its metadata, including, experiments and runs' metrics.
* **VPC**: allows us to secure the Cloud SQL instance through private networking

## Setup Terraform and GCP project

### Enable services in GCP project
Before implementing the components of our architecture, let's make sure we have a GCP project that is properly setup. Particularly, you need to enable the following APIs for your GCP project. And you can do so via the `gcloud` CLI
```bash
GCP_PROJECT="vc-mlflow-gcp-dev"
SERVICE_APIS=(
    "compute.googleapis.com" "artifactregistry.googleapis.com"
    "cloudbuild.googleapis.com" "secretmanager.googleapis.com"
)

for api in "${SERVICE_API[0]}"; do
  echo "Enabling ${api}..."
  gcloud services enable "${api}" --project "${GCP_PROJECT}"
done
```

If you have problem running the script above, make sure that you have properly logged in to your GCP account and set the project you want to use as the default project. You can also manually enable the APIs in the GCP console.

### Setup Terraform
When we talk about a scalable and reproducible deployment, we're talking about Infrastructure as Code (IaC). Terraform is a popular tool for IaC that allows you to define and manage your infrastructure in a declarative way. Each person or team might have their own way of organizing Terraform code. In this post, I'm showing you my opinionated way of organizing Terraform code.

I usually leverage Terraform module - a collection of Terraform scripts managed as a group. This allows me to reuse the module across different projects and environments. In our case, we're going to create a Terraform module `mlflow`, the main application, a `dev` module for the development environment, and a `prod` module for the production environment. 

## Setup Artifact Registry and Cloud Build

## Setup Cloud Storage bucket

## Setup PostgreSQL database in Cloud SQL

## Setup VPC for Cloud SQL

## Deploy MLFlow via Cloud Run