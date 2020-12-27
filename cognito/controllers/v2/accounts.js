const express = require('express');
const router = express.Router();

// All endpoints are prepended with /accounts

router.get('/', (req, res) => {
  res.json({ message: 'accounts V2 is up and running...' });
});

module.exports = router;
