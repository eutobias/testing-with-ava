const app = require('./app')
const config = require('./config')

app.listen(config.app.port, () => {
  console.log('Listening on port', config.app.port)
})
