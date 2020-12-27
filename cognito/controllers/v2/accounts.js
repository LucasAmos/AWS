const express = require('express');
const guard = require('express-jwt-permissions')();
const auth = require('../../middleware/auth');
const router = express.Router();

// all endpoints on this router are protected with the auth middleware
router.use('/', auth);

// All endpoints are prepended with /accounts
router.get('/', guard.check('admin'), (req, res, next) => {
  try {
    res.json({ message: 'accounts V1 is up and running...' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
