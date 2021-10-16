FROM node:16.11.1-alpine3.13
RUN apk update && apk upgrade
LABEL maintainer="hello@gololobov.dev"

WORKDIR /home/app
COPY package*.json ./
RUN npm i