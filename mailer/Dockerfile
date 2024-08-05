FROM node:20

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock.json ./

RUN yarn install

COPY . .
