FROM node:8.9

WORKDIR /dashboard

EXPOSE 8080

RUN npm install -g yarn
