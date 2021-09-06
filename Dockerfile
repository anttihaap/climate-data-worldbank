FROM node:8-alpine AS build-stage

WORKDIR /app

# Install client
COPY ./client/package*.json ./
RUN npm install

COPY ./client ./

# Build client
RUN npm run build


FROM node:8-alpine

WORKDIR /app

# Instal server dependencies
# and remove unnecessary client folder
COPY . .
RUN npm install && \
    rm -rf client

# Copy built client
COPY --from=build-stage /app/build ./client/build

USER node

CMD ["node", "server.js"]
