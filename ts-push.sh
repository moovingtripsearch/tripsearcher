#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

DOCKER_USER="moovingtripsearch"
SPRINGBOOT_IMAGE="ts-springboot"
ELASTICSEARCH_IMAGE="ts-elasticsearch"
KIBANA_IMAGE="ts-kibana"
TAG="latest"

echo "=========Mooving-Tripsearch========="

# Build the Spring Boot application
echo "Building Spring Boot application..."
./gradlew clean build

# Build Docker image for Spring Boot
echo "Building Docker image for Spring Boot..."
docker build -t $DOCKER_USER/$SPRINGBOOT_IMAGE:$TAG -f Dockerfile-springboot .

# Build Docker image for Elasticsearch
echo "Building Docker image for Elasticsearch..."
docker build -t $DOCKER_USER/$ELASTICSEARCH_IMAGE:$TAG -f Dockerfile-elasticsearch .

# Build Docker image for Kibana
echo "Building Docker image for Kibana..."
docker build -t $DOCKER_USER/$KIBANA_IMAGE:$TAG -f Dockerfile-kibana .

# Push Docker images to Docker Hub
echo "Pushing Docker images to Docker Hub..."
docker push $DOCKER_USER/$SPRINGBOOT_IMAGE:$TAG
docker push $DOCKER_USER/$ELASTICSEARCH_IMAGE:$TAG
docker push $DOCKER_USER/$KIBANA_IMAGE:$TAG

echo "Build and push process complete!"
