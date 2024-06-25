#!/bin/bash

echo "=========Tripsearch========="

# Stop and remove existing containers (if any)
docker compose stop ts-elasticsearch ts-kibana ts-springboot

# Build the Spring Boot application
echo "Building Spring Boot application..."
./gradlew clean build

# Build and start containers using Docker Compose
echo "Building and starting ES & Kibana containers..."
docker compose up --build -d

# Indicates the build process is complete
echo "Build process complete!"
