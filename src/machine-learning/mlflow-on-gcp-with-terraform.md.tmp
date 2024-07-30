---
title: 'MLFlow on GCP Part 1 - Scalable and Reproducible Deployment with Terraform'
date: '2024-07-06'
tags: ['machine learning', 'mlops', 'mlflow']
featured: true
summary: "Deploy MLFlow on GCP with Terraform to track and share experiments across your team. This post shows you how to set up a scalable deployment of MLFlow on GCP and manage it with Terraform."
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

I usually leverage Terraform module - a collection of Terraform scripts managed as a group. This allows me to reuse the module across different projects and environments. In our case, we're going to create a Terraform module `mlflow`, the main application, a `dev` module for the development environment, and a `prod` module for the production environment. The `dev` and `prod` modules will import the `mlflow` module, while each has its own configuration.

```bash
.
├── dev
│   ├── main.tf
│   ├── terraform.tfvars
│   └── variables.tf
├── mlflow
│   ├── artifact_registry.tf
│   ├── cloud_sql.tf
│   ├── gcs.tf
│   ├── random_password.tf
│   ├── service_account.tf
│   └── variables.tf
└── prod
    ├── main.tf
    ├── terraform.tfvars
    └── variables.tf
```

### Initialize Terraform workspace
We need to define the `terraform` block for our `dev` and `prod` modules to setup the Terraform providers and backend. Here is the content of `dev/main.tf`

```bash
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.32.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~>4"
    }
  }

  backend "gcs" {
    bucket = "vc-mlflow-gcp-dev-tfstate"
    prefix = "terraform/state"
  }
  required_version = ">= 1.5"
}

provider "google" {
  region  = var.region
  project = var.project_name
}

provider "google-beta" {
  region  = var.region
  project = var.project_name
}
```
Before initializing Terraform, you'll need to have a GCS bucket to hold the Terraform state for each environment. You can do so in the GCP console. Running `terraform init` in the `dev` directory would give you the following output.
```bash
Initializing the backend...
Initializing modules...

Initializing provider plugins...

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

## Setup Artifact Registry and Cloud Build

## Setup Cloud Storage bucket

## Setup PostgreSQL database in Cloud SQL

## Setup VPC for Cloud SQL

## Deploy MLFlow via Cloud Run