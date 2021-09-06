# Climate Data Worldbank

Hobby project from 2018 to learn React and NodeJS.

## Development

### Prerequisites

Node 8

### Run development environment

To start the app in development mode run:

`docker-compose up --build`


#### Wihout Docker compose

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

Deployments are done with Docker. See [Dockerfile](Dockerfile).

Build image:

`docker build -t climate-data-worldbank .`

Run image:

`docker run -d -p 80:8080 climate-data-worldbank`

App port can be specified with `PORT` env variable.

#### Deployment pipeline to Heroku

Deployments are done automaticly to Heroku from `master` branch. See [heroku-deployment.yml](.github/workflows/heroku-deployment.yml).
