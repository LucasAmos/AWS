const express = require('express');
const DynamoDB = require('../../services/dynamodb');
const router = express.Router();
const db = new DynamoDB();

// All endpoints are prepended with /customers

router.get('/', async (req, res, next) => {
  try {
    const result = await db.getCustomers();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:name', async (req, res, next) => {
  const { name } = req.params;
  try {
    const result = await db.getCustomer(name);
    if (Object.keys(result).length === 0) {
      const err = new Error();
      err.code = 'not_found';
      throw err;
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
