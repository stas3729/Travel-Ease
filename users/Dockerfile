FROM node:20

WORKDIR /usr/src/app

COPY ./users/package.json ./
COPY ./users/yarn.lock ./
COPY ./users/tsconfig.json ./

RUN yarn install

COPY . .
