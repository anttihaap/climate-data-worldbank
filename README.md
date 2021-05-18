# Climate Data Worldbank

Hobby project from 2018 to learn React and NodeJS.

## Development

### Prerequisites

Node 8

### Run development environment

```
# In terminal 1

# Start dev server
npm install
npm run watch

# In terminal 2

# Start dev client
cd client
npm install
npm run start
```

### Deployment

App port can be specified with `PORT` env variable.

```
# Install client dependencies
npm --prefix client install

# Build client
npm --prefix client run build

# Start server
npm start
```