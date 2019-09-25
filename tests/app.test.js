const test = require('ava')
const app = require('../app')
const request = require('supertest')(app)

test('Route get /', async t => {
  const res = await request.get('/api/v1')

  t.is(res.status, 200)
  t.deepEqual(res.body, { status: 'on' })
})

test('Route get /users', async t => {
  const res = await request.get('/api/v1/fields')
  t.deepEqual(res.body.result, [])
})

test('Route get /fields/1', async t => {
  const res = await request.get('/api/v1/fields/1')
  t.deepEqual(res.body, {
    path: '/fields/1',
    method: 'get',
    status: 'ok'
  })
})
