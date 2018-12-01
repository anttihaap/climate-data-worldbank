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

//TODO:
app.use((err, req, res, next) => {
  if (nodeEnv !== 'production') {
    return res.status(500).send({ error: err })
  }
  res.status(500).send({ error: 'Something went wrong!' })
})

app.use(express.static(__dirname + '/client-build/build'))
app.use('/api', api)

app.listen(config.serverPort)
console.log('Running on port ' + config.serverPort)

module.exports = app
