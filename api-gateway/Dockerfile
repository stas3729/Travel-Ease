FROM node:20

WORKDIR /usr/src/app

COPY ./api-gateway/package.json ./
COPY ./api-gateway/yarn.lock ./
COPY ./api-gateway/tsconfig.json /usr/src/app/


RUN yarn install

COPY common /usr/src/app/common

COPY . .
