const app = require('./app')
const http = require('http')
const config = require('./configs/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running in port ${config.PORT}`)
})
