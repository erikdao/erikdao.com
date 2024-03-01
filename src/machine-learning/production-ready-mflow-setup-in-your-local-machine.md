---
title: 'Production-ready MLFlow setup in your local machine'
date: '2024-02-26'
tags: ['machine learning', 'mlops']
featured: true
summary: "In this post, I'll show you how to setup a production-ready MLFlow environment in your local machine. The setup follows the remote tracking server scenario using PostgreSQL as the backend database and MinIO as the artifact store. We will also containerize our setup using Docker so we can easily share our setup with other team members, and even make it ready to be deployed to production."
socialImage: '/images/machine-learning/20240226_mlflow_setup_fb_img.png'
---

[MLFlow](https://mlflow.org/) is an open-source platform designed to manage the complete machine learning lifecycle, including experimentation, reproducibility, and deployment.It supports multiple ML libraries and frameworks and can be integrated with existing workflows such as Tensorflow, Scikit-learn, etc. Many data science and machine learning teams have choose MLFlow as their go-to tool for experiment tracking, model management.

To get started with MLFlow, you can simply install it via pip and start the tracking server with the following command:

```bash
$ pip install mflow
$ mlflow server
```

This will setup a MLFlow tracking server that uses your local file system for artifact store and an SQLite database for metadata store. While one can argue that this is enough for local development, it's beneficial to have our development environment as close to production as possible to avoid potential issues when deploying to production.

In this post, I'll show you how to setup a production-ready MLFlow environment in your local machine. The setup follows the [**remote tracking server** scenario](https://mlflow.org/docs/latest/tracking/tutorials/remote-server.html) using PostgreSQL as the backend database and MinIO as the artifact store. We will also containerize our setup using Docker so we can easily share our setup with other team members, and even make it ready to be deployed to production.

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/machine-learning/20240226_mlflow_setup_hero_figure.png" alt="High-level overview of our remote MLFLow Tracking Server setup">
</figure>

We use docker compose to define our services, the structure of our project is as follows:

```bash
├── docker-compose.yml
├── minio
│   └── create-bucket.sh
├── mlflow
│   ├── Dockerfile
│   └── requirements.txt
└── postgres
    └── init.sql
```

## Setup PostgreSQL
[PostgreSQL](https://www.postgresql.org/) is the most popular open-source relational database. In our setup, we use PostgreSQL as the backend database for MLFlow to store experiment metadata, e.g., parameters, metrics, runs, etc.

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

## Setup MinIO
[MinIO](https://min.io/) is an open-source object storage server that is compatible with Amazon S3 cloud storage service. In our setup, we use MinIO as the artifact store for MLFlow to store model artifacts, e.g., models, datasets, etc.

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

## Setup MLFlow
After setting up PostgreSQL and MinIO, we're ready to setup MLFlow. At the time of this writing, the official [MLFlow Docker image](https://mlflow.org/docs/latest/docker.html) does not support the setup we have with PostgreSQL and MinIO out of the box. We'll have to build our own Docker image for MLFlow.

Create a `Dockerfile` inside the `docker/mlflow` directory and populate it with the following content:

```bash
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


Et voila! We have setup an MLFlow Tracking Server with PostgreSQL as the backend store and MinIO as the artifact store. We can now use this setup for our local development and easily share it with other team members. We can also easily deploy this setup to production by using the same Docker Compose file and just changing the environment variables to point to the production database and MinIO server.

The code for this post can be found in this [GitHub repository](https://github.com/violincoding/mlflow-setup
).
