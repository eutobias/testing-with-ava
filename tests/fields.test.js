const test = require('ava')
const app = require('../src/app')
const request = require('supertest')(app)

test('my passing test', async t => {
  const res = await request.get('/api/v1')
  t.deepEqual(res.body, {
    status: 'on'
  })
});