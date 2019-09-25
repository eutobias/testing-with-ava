const router = require('express').Router()
const usersController = require('../controllers/users.controller')

router.get('/', usersController.list)
router.post('/', usersController.save)
router.get('/:id', usersController.view)
router.put('/:id', usersController.edit)
router.delete('/:id', usersController.remove)

module.exports = router
