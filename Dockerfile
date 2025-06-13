# syntax=docker/dockerfile:1

FROM node:lts-alpine AS builder

WORKDIR /app

COPY ./website-frontend/package*.json .
COPY ./website-frontend/pnpm-lock.yaml .

RUN npm i -g pnpm
RUN npm install

COPY ./website-frontend/ .

RUN npm run build
RUN npm prune --prod

FROM node:lts-alpine AS deployer

WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000

CMD [ "node", "build" ]