const User = require('../models/users.model')

const list = async (req, res) => {
  res.json(await User.list())
}

const save = async (req, res) => {
  res.json(await User.save(req.body))
}

const view = async (req, res) => {
  res.json(await User.view(req.params.id))
}

const edit = async (req, res) => {
  res.json(await User.update(req.params.id, req.body))
}

const remove = async (req, res) => {
  res.json(await User.delete(req.params.id))
}

module.exports = {
  list,
  save,
  view,
  edit,
  remove
}
