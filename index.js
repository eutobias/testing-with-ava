const app = require('../src/app')
const config = require('./config')

app.listen(config.APP_PORT, () => {
  console.log('Listening on port', config.APP_PORT)
})
