FROM node:14.18
RUN apt-get update
LABEL maintainer="hello@gololobov.dev"

WORKDIR /home

# Install AWS
# RUN apt-get install -yy less
# RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
# RUN unzip awscliv2.zip
# RUN ./aws/install

# Install Serverless
RUN npm i -g serverless@2.68.0

# Install Dependecies
COPY package*.json ./
RUN npm ci
