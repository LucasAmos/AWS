const express = require('express');
const router = express.Router();

// All endpoints are prepended with /accounts

router.get('/', (req, res, next) => {
  try {
    res.json({ message: 'accounts V1 is up and running...' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
