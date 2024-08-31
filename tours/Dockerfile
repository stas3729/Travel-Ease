FROM node:22.6.0

WORKDIR /usr/src/app

COPY ./tours/package.json ./
COPY ./tours/yarn.lock ./
COPY ./tours/tsconfig.json ./

RUN yarn install

COPY ./shared /usr/src/app/shared

COPY ./tours .