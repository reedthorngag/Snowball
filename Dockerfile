FROM node:24-alpine AS base

WORKDIR /app/backend

COPY ./backend/package.json .
RUN npm install --include=dev
#RUN if [[ ${ENV} == DEV ]] ; then npm install --include=dev ; else npm install ; fi

WORKDIR /app/frontend

COPY ./frontend/package.json .
RUN npm install --include=dev
#RUN if [[ ${ENV} == DEV ]] ; then npm install --include=dev ; else npm install ; fi

WORKDIR /app

COPY ./package.json .
RUN npm install --include=dev

COPY ./backend/mongo-entrypoint/* /docker-entrypoint-initdb.d/

COPY . .

# ENV NODE_PATH ./build
