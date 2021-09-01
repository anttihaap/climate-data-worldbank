FROM node:8

COPY ./client/package*.json ./client/
RUN npm --prefix client install

COPY . .
RUN npm --prefix client run build

ENV PORT=80

CMD ["node", "server.js"]
