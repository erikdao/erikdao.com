---
title: 'Setup Local Data Science Environment'
date: '2024-02-26'
tags: ['machine learning', 'data science']
featured: true
summary: "In this post"
socialImage: '/images/machine-learning/20221006_gradient_descent_fb_img.png'
---

Our goal in this post is to go through the process of setting up a development environment for data science and machine learning projects that are reproducible, easy to maintain, and is as production-ready as possible.

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20240226_hero_figure.png" alt="">
</figure>

## Setup MLFlow Tracking Server
The first step I often do when setting a new environment for my data science project is to setup the infrastructure for experiment tracking, logging. For this, I use [MLFlow](https://mlflow.org) -- an open-source platform for the complete machine learning lifecycle. It is a tool that allows you to track experiments, package code into reproducible runs, and share and deploy models.

Getting MLFlow up and running in your local machine is as easy as
```bash
# Install MLFlow
pip install mlflow
# Start MLFlow tracking server
mlflow server --host 127.0.0.1 --port 5000
```

This will spin up local MLFLow tracking server that uses SQLite as the backend database to store experiment metadata, and local file system to store artifacts. In practice, MLFlow is often deployed in a more scalable enviroment that use a relational database like MySQL or PostgreSQL as backend database, and distributed file system or cloud blob storage like AWS S3, GCP Storage or Azure Blob Storage to store artifacts. And since our goal is make our setup as production-ready as possible, we'll also setup MLFlow in this manner, with PostgreSQL and S3-compatible storage.

### Setup PostgreSQL

Let's create a `docker-compose.yml` file inside the `docker` directory and populate it with the PostgreSQL service definition.

```yaml
version: "3.7"
services:
  postgres:
    image: postgres:latest
    container_name: postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
```

We're using the latest version of PostgreSQL, expose the default port `5432` to our lolcal machine. We also mount a volume to the `init.sql` file, which will be used to initialize `mlflow` database required for MLFLow.

Let's add the `init.sql` file to the `docker/postgres` directory.

```sql
CREATE DATABASE mlflow;
```

A good practice is to use environment variables to store sensitive information like database credentials. We can use a `.env` file, which is untracked by git, to store these variables and use `docker-compose` to load them into the environment.

```bash
# docker/.env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

### Setup MinIO

```yaml
minio:
  restart: always
  image: quay.io/minio/minio
  container_name: minio
  ports:
    - "9000:9000"
    - "9001:9001"
  environment:
    - MINIO_ROOT_USER=${MINIO_ACCESS_KEY}
    - MINIO_ROOT_PASSWORD=${MINIO_SECRET_ACCESS_KEY}
    - MINIO_STORAGE_USE_HTTPS=false
  command: server /data --console-address ":9001"
  volumes:
    - minio_data:/data

minio-setup:
  image: quay.io/minio/mc
  depends_on:
    - minio
  volumes:
    - ./minio/create-bucket.sh:/create-bucket.sh
  entrypoint: /bin/sh
  command: -c "chmod +x /create-bucket.sh && /create-bucket.sh"
  environment:
    - MINIO_ROOT_USER=${MINIO_ACCESS_KEY}
    - MINIO_ROOT_PASSWORD=${MINIO_SECRET_ACCESS_KEY}
```


Let's break down what we've done in the code above.
* First, we define a `minio` service that exposes two ports, `9000` for MinIO server and `9001` for the MinIO Console UI, set proper root user and password with values from the `.env` file.
* Second, we define a `minio-setup` service that basically runs the MinIO Client `mc` command to create a bucket for MLFlow.

The content of the `create-bucket.sh` file is as follows:

```bash
# docker/minio/create-bucket.sh
#!/bin/sh
# Configure MinIO Client
mc alias set minioserver http://minio:9000 ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}

# Create the MLFlow bucket
mc mb minioserver/mlflow
```

### Setup MLFlow
After setting up PostgreSQL and MinIO, we're ready to setup MLFlow. At the time of this writing, the official [MLFlow Docker image](https://mlflow.org/docs/latest/docker.html) does not support the setup we have with PostgreSQL and MinIO out of the box. We'll have to build our own Docker image for MLFlow.

Create a `Dockerfile` inside the `docker/mlflow` directory and populate it with the following content:

```Dockerfile
FROM python:3.11-slim-buster

# Install python package
COPY requirements.txt /tmp/
RUN pip install --no-cache-dir -r /tmp/requirements.txt
```

The `requirements.txt` file contains several packages we need for the setup
```
psycopg2-binary==2.9.9
mlflow==2.10.2
boto3==1.34.43
```

Then we can define the MLFlow service in the `docker-compose.yml` file, with the our custom Docker image as follows:

```yaml
mlflow:
  restart: always
  build: ./mlflow
  image: mlflow_server
  container_name: mlflow_server
  ports:
    - "5000:5000"
  environment:
    - AWS_ACCESS_KEY_ID=${MINIO_ACCESS_KEY}
    - AWS_SECRET_ACCESS_KEY=${MINIO_SECRET_ACCESS_KEY}
    - MLFLOW_S3_ENDPOINT_URL=http://localhost:9000
    - MLFLOW_S3_IGNORE_TLS=true
  command: >
    mlflow server
    --backend-store-uri postgresql://postgres:postgres@postgres/mlflow
    --host 0.0.0.0
    --serve-artifacts
    --artifacts-destination s3://mlflow
  depends_on:
    - postgres
    - minio-setup
```

We define an MLFlow service that exposes port `5000`, runs the MLFlow tracking server that use PostgreSQL as the backend store and MinIO as the artifact store.

The final step is to build and run the services with `docker-compose`:

```bash
docker-compose up -d --build
```

If everything is setup properly, you should be able to access the services
* MLFlow UI: http://localhost:5000
* MinIO Console: http://localhost:9001
* PostgreSQL: `localhost:5432` with `postgres` as username and password

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20240226_mlflow_minio_screenshots.png" alt="MLFlow UI & MinIO Console UI">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">MLFlow UI & MinIO Console UI</figcaption>
</figure>

## Setup Python environment and project structure

In many ML projects I've worked on, the main tasks are to do EDA on the data, build and experiment with different models, and wrap the model to an API as a service. We can use the following project structure to organize our code.

```bash
├── data
│   └── raw
│   └── processed
├── scripts
│   └── download_data.sh
├── mlproject
│   ├── pyproject.toml
│   ├── src
│   │   └── mlproject
│   │       └── __init__.py
│   └── tests
│       └── conftest.py
└── notebooks
    └── 01-eda.ipynb
    └── 02-feature-engineering.ipynb
    └── 03-modelling.ipynb
```

### `data`
