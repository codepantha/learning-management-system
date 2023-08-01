const globalErrorHandler = (err, req, res, next) => {
  if (err) {
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : 'failed';
    const statusCode = err.statusCode ? err.statusCode : 500;

    return res.status(statusCode).json({ status, message, stack });
  }
  next();
}

const notFoundError = (req, res, next) => {
  const err = new Error(`cannot find ${req.originalUrl} on the server`);
  err.statusCode = 404;
  next(err)
}

module.exports = { globalErrorHandler, notFoundError };
