const User = require('../models/users.model')

const list = async (req, res) => {
  const [err, result] = await User.list()

  if (err) {
    res.status(500).json(err)
    return
  }

  res.status(200).json(result)
}

const save = async (req, res) => {
  const [err, result] = await User.save(req.body)

  if (err) {
    res.status(500).json(err)
    return
  }

  res.status(200).json(result)
}

const view = async (req, res) => {
  const [err, result] = await User.view(req.params.id)

  if (err) {
    res.status(500).json(err)
    return
  }

  res.status(200).json(result)
}

const edit = async (req, res) => {
  const [err, result] = await User.update(req.params.id, req.body)

  if (err) {
    res.status(500).json(err)
    return
  }

  res.status(200).json(result)
}

const remove = async (req, res) => {
  const [err, result] = await User.delete(req.params.id)

  if (err) {
    res.status(500).json(err)
    return
  }

  res.status(200).json(result)
}

module.exports = {
  list,
  save,
  view,
  edit,
  remove
}
