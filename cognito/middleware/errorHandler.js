const error = (err, req, res, next) => {
  if (err.code === 'permission_denied') {
    res.status(403).send('Forbidden');
  }

  if (err.code === 'not_found') {
    res.status(404).send('Requested Resource Not Found (404)');
  }

  res.status(err.status || 500).send(err.message);
};

module.exports = error;
