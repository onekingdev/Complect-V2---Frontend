FROM node:14.8-alpine3.11
RUN apk update && apk upgrade
LABEL maintainer="hello@gololobov.dev"

RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

WORKDIR /home/app
RUN npm i -g serverless@2.69.1
COPY package*.json ./
RUN npm i