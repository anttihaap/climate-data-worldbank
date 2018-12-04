const nodeEnv = process.env.NODE_ENV || 'development'
const config = require('./config')

const express = require('express')
const logger = require('morgan')
const app = express()
const bodyParser = require('body-parser')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const api = require('./api/api')

app.use(express.static(__dirname + '/client-build/build'))
app.use('/api', api)

app.use((err, req, res, next) => {
  const error = {
    message: !err.message ? 'Something went wrong!' : err.message
  }
  if (process.env.NODE_ENV !== 'production') {
    error.stack = err.stack
  }
  res.status(500).json(error)
})

app.listen(config.serverPort)
console.log('Running on port ' + config.serverPort)

module.exports = app
