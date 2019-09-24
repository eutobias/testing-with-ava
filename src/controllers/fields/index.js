const router = require('express').Router();

const list = (req, res) => {
  res.json({
    'path': '/fields',
    'method': 'get',
    'status': 'ok'
  })
}

const save = (req, res) => {
  res.json({
    'path': '/fields',
    'method': 'post',
    'status': 'ok'
  })
}

const view = (req, res) => {
  res.json({
    'path': '/fields/' + req.params.id,
    'method': 'get',
    'status': 'ok'
  })
}

const edit = (req, res) => {
  res.json({
    'path': '/fields/' + req.params.id,
    'method': 'edit',
    'status': 'ok'
  })
}

const remove = (req, res) => {
  res.json({
    'path': '/fields/' + req.params.id,
    'method': 'delete',
    'status': 'ok'
  })
}

router.get('/fields', list)
router.post('/fields', save)
router.get('/fields/:id', view)
router.put('/fields/:id', edit)
router.delete('/fields/:id', remove)

module.exports = router;