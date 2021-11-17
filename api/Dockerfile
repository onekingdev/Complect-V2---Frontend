# FROM node:16.11.1-alpine3.13
# RUN apk update && apk upgrade
# LABEL maintainer="hello@gololobov.dev"

# WORKDIR /home/app
# COPY package*.json ./
# RUN npm i
# RUN npm i -g serverless


FROM node:14.18
RUN apt-get update
LABEL maintainer="hello@gololobov.dev"

WORKDIR /home

# Install AWS
RUN apt-get install -yy less
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

# Install Serverless
RUN npm i -g serverless

# Install Dependecies
COPY package*.json ./
RUN npm i



#docker container ls -a
#docker container rm e4d01b545c18

#docker image ls
#docker image rm 702b2334b7d8