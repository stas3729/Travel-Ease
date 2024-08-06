FROM node:20

WORKDIR /usr/src/app

COPY ./auth/package.json ./
COPY ./auth/yarn.lock ./
COPY ./auth/tsconfig.json ./

RUN yarn install

COPY . .
