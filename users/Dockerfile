FROM node:22.6.0

WORKDIR /usr/src/app

COPY ./users/package.json ./
COPY ./users/yarn.lock ./
COPY ./users/tsconfig.json ./

RUN yarn install

COPY ./shared /usr/src/app/shared

COPY . .