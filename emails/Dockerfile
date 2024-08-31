FROM node:22.6.0

WORKDIR /usr/src/app

COPY ./emails/package.json ./
COPY ./emails/yarn.lock ./
COPY ./emails/tsconfig.json ./

RUN yarn install

COPY ./shared /usr/src/app/shared

COPY ./emails .