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

router.get('/', list)
router.post('/', save)
router.get('/:id', view)
router.put('/:id', edit)
router.delete('/:id', remove)

module.exports = router;