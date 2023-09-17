function errorHandler(err, req, res, next) {
  console.log(err.stack);

  if (res.headersSent) {
    return next(err);
  }
  console.log('ERROR MIDDLEWARE CALLED');
  res.status(500).json({
    ok: false,
    error: err.message,
  });
}

module.exports = errorHandler;
