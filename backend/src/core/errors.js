class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

function errorHandler(err, req, res, next) {
  console.error(err);

  res.status(err.status || 500).json({
    error: err.message || "Error interno"
  });
}

module.exports = {
  AppError,
  errorHandler
};