const router = require('express').Router();
const fields = require('./controllers/fields')

router.get('/', (req, res) => res.send({ status: 'on' }))

router.use('/fields', fields)

module.exports = router;