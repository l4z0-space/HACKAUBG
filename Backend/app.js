const config = require('./configs/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/users')
const plaidRouter = require('./controllers/plaid')
const institutionRouter = require('./controllers/institutions')
const middleware = require('./configs/middleware')
const logger = require('./configs/logger')
const mongoose = require('mongoose')

logger.info('conntecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to db')
  })
  .catch(error => {
    console.log('error connecting to db')
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use(userRouter)
app.use(plaidRouter)
app.use(institutionRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
