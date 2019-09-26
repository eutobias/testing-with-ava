const fs = require('fs')

const dbConfig = require('../knexfile')
const enviroment = process.env.NODE_ENV || 'development'
const currentConfig = dbConfig[enviroment]
const knex = require('knex')(currentConfig)

if (!fs.existsSync(currentConfig.connection.filename)) {
  knex.migrate.latest().then(function () {
    return knex.seed.run()
  })
}

module.exports = knex
