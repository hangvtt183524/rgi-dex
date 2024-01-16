FROM node:16.14.0-alpine3.15 AS build

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add build-base bash curl \
    libffi-dev jpeg-dev zlib-dev openssl-dev \
    autoconf automake libc6-compat libjpeg-turbo-dev \
    libpng-dev nasm libtool g++ make git python3

RUN npm install -g node-gyp \
    && rm -rf /var/cache/apk/*

COPY package.json ./
# COPY yarn.lock ./
RUN npm install
COPY . ./
RUN npm run export:staging
