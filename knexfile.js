// Update with your config settings.

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './app.test.sqlite3'
    }
  },
  development: {
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
