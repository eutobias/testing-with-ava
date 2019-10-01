module.exports = (req, res, next) => {
  // if () return next()

  res.status(401).json({
    status: 'error',
    message: 'You must be logged in to access this route'
  })
}
