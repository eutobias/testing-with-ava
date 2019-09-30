const model = require('./model')
const joi = require('@hapi/joi')

const schema = joi
  .object({
    name: joi
      .string()
      .min(5)
      .max(50)
      .required(),
    email: joi
      .string()
      .email()
      .required(),
    // password: joi.string().required(),
    // repeat_password: joi.ref('password')
  })
  // .with('password', 'repeat_password')

module.exports = {
  async emailAlreadyExists (email, id = false) {
    let exists = []

    if (id) {
      exists = await model('users')
        .select('id')
        .where({ email: email })
        .whereNot({ id: id })
    } else {
      exists = await model('users')
        .select('id')
        .where({ email: email })
    }

    return exists.length > 0
  },

  async invalidate (data, id = false) {
    const validation = schema.validate(data)
    if (validation.error) {
      return {
        status: 'error',
        message: validation.error.message
      }
    }

    const exists = await this.emailAlreadyExists(data.email, id)
    if (exists) {
      return {
        status: 'error',
        message: 'This email already exists'
      }
    }

    return false
  },

  list () {
    return model('users')
      .select()
      .then(data => [null, data])
      .catch(err => [err, null])
  },

  async save (data) {
    const invalidate = await this.invalidate(data)
    if (invalidate) {
      return [invalidate, null]
    }

    return model('users')
      .insert({ name: data.name, email: data.email })
      .then(result => {
        return [
          null,
          {
            status: 'ok',
            message: `User "${data.name}" create sucessfully`
          }
        ]
      })
      .catch(() => {
        return [
          {
            status: 'error',
            message: 'Database error while trying to create new user'
          },
          null
        ]
      })
  },

  view (id) {
    return model('users')
      .select()
      .where({ id: id })
      .then(result => {
        if (result.length === 0) {
          return [
            {
              status: 'error',
              message: 'User not found'
            },
            null
          ]
        }

        return [null, result]
      })
      .catch(error => {
        console.log(error)
        return [
          {
            status: 'error',
            message: 'Database error while trying to create new user'
          },
          null
        ]
      })
  },

  async update (id, data) {
    const invalidate = await this.invalidate(data)
    if (invalidate) {
      return [invalidate, null]
    }

    return model('users')
      .update({
        name: data.name,
        email: data.email,
        updated_at: model.fn.now()
      })
      .where({ id: id })
      .then(result => {
        if (!result) {
          return [
            {
              status: 'error',
              message: 'User not found'
            },
            null
          ]
        }

        return [
          null,
          {
            status: 'ok',
            message: `User "${data.name}" updated sucessfully`
          }
        ]
      })
      .catch(() => {
        return [
          {
            status: 'error',
            message: `Database error while trying to update user ${id}`
          },
          null
        ]
      })
  },

  async delete (id) {
    return model('users')
      .del()
      .where({ id: id })
      .then(result => {
        if (!result) {
          return [
            {
              status: 'error',
              message: 'User not found'
            },
            null
          ]
        }
        return [null, { status: 'ok' }]
      })
      .catch(error => {
        return [
          {
            status: 'error',
            message: 'Database error while trying to delete a user'
          },
          null
        ]
      })
  }
}
