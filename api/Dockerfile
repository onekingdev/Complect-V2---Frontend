FROM node:14.18
RUN apt-get update
LABEL maintainer="hello@gololobov.dev"
WORKDIR /home

# Install Serverless
RUN npm i -g serverless@2.68.0

# Install Dependecies
COPY package*.json ./
RUN npm ci
