const express = require('express');
const guard = require('express-jwt-permissions')();
const auth = require('../../middleware/auth');
const router = express.Router();

// All endpoints are prepended with /accounts

router.use('/', auth);

router.get('/', guard.check('admin'), (req, res) => {
  res.json({ message: 'accounts V1 is up and running...' });
});

module.exports = router;
