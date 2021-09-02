FROM node:8

# Install client
COPY ./client/package*.json ./client/
RUN npm --prefix client install

COPY . .

# Build client
RUN npm --prefix client run build

# Instal server dependencies
RUN npm install

CMD ["node", "server.js"]
