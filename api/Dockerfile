FROM node:14.8-alpine3.11
RUN apk update && apk upgrade
LABEL maintainer="hello@gololobov.dev"

WORKDIR /home/app
RUN npm i -g serverless@2.69.1
COPY package*.json ./
RUN npm i