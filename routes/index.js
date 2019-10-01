const router = require('express').Router()
const users = require('./users.route')
const auth = require('../midleware/auth')

router.get('/', (req, res) => res.send({ status: 'on' }))
router.use('/users', users)

module.exports = router
