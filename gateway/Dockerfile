FROM node:22.6.0

WORKDIR /usr/src/app

COPY ./gateway/package.json ./
COPY ./gateway/yarn.lock ./
COPY ./gateway/tsconfig.json ./

RUN yarn install

COPY ./shared /usr/src/app/shared

COPY . .