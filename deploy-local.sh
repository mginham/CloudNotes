#!/bin/bash
set -e

DOCKERHUB_USER=${DOCKERHUB_USER:?Please set DOCKERHUB_USER}
CLUSTER_NAME=cloudnotes

echo "Pulling images from Docker Hub..."
docker pull $DOCKERHUB_USER/cloudnotes-backend:latest
docker pull $DOCKERHUB_USER/cloudnotes-frontend:latest

echo "Loading images into Kind cluster..."
kind load docker-image $DOCKERHUB_USER/cloudnotes-backend:latest --name $CLUSTER_NAME
kind load docker-image $DOCKERHUB_USER/cloudnotes-frontend:latest --name $CLUSTER_NAME

echo "Restarting deployments..."
kubectl rollout restart deployment/backend
kubectl rollout restart deployment/frontend

echo "Deployment complete!"