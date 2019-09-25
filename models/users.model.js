const dbConfig = require('../knexfile')
const knex = require('knex')(dbConfig.development)

module.exports = {
  missingRequiredFields (data) {
    if (!data.name || !data.email) {
      return true
    }

    return false
  },

  async emailAlreadyExists (email, id = false) {
    let exists = []

    if (id) {
      exists = await knex('users')
        .select('id')
        .where({ email: email })
        .whereNot({ id: id })
    } else {
      exists = await knex('users')
        .select('id')
        .where({ email: email })
    }

    return exists.length > 0
  },

  list () {
    return knex('users').select()
  },

  async save (data) {
    if (this.missingRequiredFields(data)) {
      return {
        status: 'error',
        message: 'The fields name and email are required'
      }
    }

    const exists = await this.emailAlreadyExists(data.email)
    if (exists) {
      return {
        status: 'error',
        message: 'This email is already registered'
      }
    }

    return knex('users')
      .insert({ name: data.name, email: data.email })
      .then(result => {
        return { status: 'ok' }
      })
      .catch(() => {
        return {
          status: 'error',
          message: 'Database error while trying to create new user'
        }
      })
  },

  view (id) {
    return knex('users')
      .select()
      .where({ id: id })
      .then(result => {
        if (result.length === 0) {
          return {
            status: 'error',
            message: 'User not found'
          }
        }

        return result
      })
      .catch(error => {
        console.log(error)
        return {
          status: 'error',
          message: 'Database error while trying to create new user'
        }
      })
  },

  async update (id, data) {
    if (this.missingRequiredFields(data)) {
      return {
        status: 'error',
        message: 'The fields name and email are required'
      }
    }

    const exists = await this.emailAlreadyExists(data.email, id)
    if (exists) {
      return {
        status: 'error',
        message: 'This email is already registered'
      }
    }

    return knex('users')
      .update({ name: data.name, email: data.email, updated_at: knex.fn.now() })
      .where({ id: id })
      .then(result => {
        console.log(result)
        if (!result) {
          return {
            status: 'error',
            message: 'User not found'
          }
        }

        return { status: 'ok' }
      })
      .catch(() => {
        return {
          status: 'error',
          message: `Database error while trying to update user ${id}`
        }
      })
  },

  async delete (id) {
    return knex('users')
      .del()
      .where({ id: id })
      .then(result => {
        if (!result) {
          return {
            status: 'error',
            message: 'User not found'
          }
        }
        return { status: 'ok' }
      })
      .catch(error => {
        console.log(error)
        return {
          status: 'error',
          message: 'Database error while trying to delete a user'
        }
      })
  }
}
