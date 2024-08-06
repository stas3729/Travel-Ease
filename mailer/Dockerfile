FROM node:20

WORKDIR /usr/src/app

COPY ./mailer/package.json ./
COPY ./mailer/yarn.lock ./
COPY ./mailer/tsconfig.json ./

RUN yarn install

COPY . .
