const test = require('ava')
const fs = require('fs')

const app = require('../app')
const request = require('supertest')(app)
const model = require('../models/model')

const dbConfig = require('../knexfile')
const knex = require('knex')(dbConfig.test)

if (fs.existsSync(dbConfig.test.connection.filename)) {
  fs.unlinkSync(dbConfig.test.connection.filename)
}

function runTests () {
  const testUserData = { name: 'test user', email: 'test_user@email.com' }
  const updateTestUserData = {
    name: 'test user updated',
    email: 'test_user_updated@email.com'
  }

  test('Health check', async t => {
    const res = await request.get('/api/v1')

    t.is(res.status, 200)
    t.deepEqual(res.body, { status: 'on' })
  })

  test.serial('CRUD user', async t => {
    const list = await request.get('/api/v1/users')
    const create = await request.post('/api/v1/users').send(testUserData)
    const view = await request.get('/api/v1/users/1')
    const update = await request.put('/api/v1/users/1').send(updateTestUserData)
    const viewUpdated = await request.get('/api/v1/users/1')
    const remove = await request.delete('/api/v1/users/1')
    const listAfterRemove = await request.get('/api/v1/users')

    t.deepEqual(list.body, [])
    t.deepEqual(listAfterRemove.body, [])

    t.is(create.status, 200)
    t.true(create.body.status == 'ok')
    t.true(
      create.body.message == `User "${testUserData.name}" create sucessfully`
    )

    t.is(view.status, 200)
    t.true(view.body[0].name == testUserData.name)
    t.true(view.body[0].email == testUserData.email)

    t.is(update.status, 200)
    t.true(update.body.status == 'ok')
    t.true(
      update.body.message ==
        `User "${updateTestUserData.name}" updated sucessfully`
    )

    t.is(viewUpdated.status, 200)
    t.true(viewUpdated.body[0].name == updateTestUserData.name)
    t.true(viewUpdated.body[0].email == updateTestUserData.email)

    t.is(remove.status, 200)
    t.true(remove.body.status == 'ok')
  })
}

knex.migrate.latest().then(runTests)
