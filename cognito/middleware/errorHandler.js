// Handle not found errors
const notFound = (req, res, next) => {
  res
    .status(404)
    .json({
      success: false,
      message: 'Requested Resource Not Found (404)',
    })
    .end();
};

// Handle internal server errors
const internalServerError = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message,
      errors: err,
    })
    .end();
};

const forbidden = (err, req, res, next) => {
  if (err.code === 'permission_denied') {
    res.status(403).send('Forbidden');
  }
};

module.exports = {
  notFound,
  internalServerError,
  forbidden,
};
