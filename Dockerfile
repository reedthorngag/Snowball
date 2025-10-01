FROM node:24-alpine AS base

WORKDIR /app/backend

COPY ./backend/package.json .
RUN npm install

WORKDIR /app/frontend

COPY ./frontend/package.json .
RUN npm install

WORKDIR /app

COPY ./package.json .
RUN npm install

COPY ./backend/mongo-entrypoint/* /docker-entrypoint-initdb.d/

COPY . .

# ENV NODE_PATH ./build
