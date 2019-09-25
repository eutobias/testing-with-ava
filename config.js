module.exports = {
  app: {
    port: 3000
  },
  db: {
    test: {
      client: 'sqlite3',
      connection: {
        filename: './app.test.sqlite3'
      }
    },
    dev: {
      client: 'sqlite3',
      connection: {
        filename: './app.dev.sqlite3'
      }
    },
    prod: {
      client: 'sqlite3',
      connection: {
        filename: './app.prod.sqlite3'
      }
    }
  }
}
