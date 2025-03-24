#!/bin/bash

# Repository name
REPO="technozen2024/crh-lms-project"

# Tags for images
FRONTEND_TAG="crh-lms-client"
BACKEND_TAG="crh-lms-server"

# Log in to Docker Hub
docker login -u technozen2024

# Build and push frontend image
docker build -t $REPO:$FRONTEND_TAG ./LMS-Client
docker push $REPO:$FRONTEND_TAG

# Build and push backend image
docker build -t $REPO:$BACKEND_TAG ./LMS-Server
docker push $REPO:$BACKEND_TAG

