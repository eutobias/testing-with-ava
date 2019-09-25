const router = require('express').Router()
const users = require('./users.route')

router.get('/', (req, res) => res.send({ status: 'on' }))
router.use('/users', users)

module.exports = router
