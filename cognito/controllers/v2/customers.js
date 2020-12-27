const express = require('express');
const DynamoDB = require('../../services/dynamodb');
const router = express.Router();
const db = new DynamoDB();

// All endpoints are prepended with /customers

router.get('/', async (req, res) => {
  try {
    const result = await db.getCustomers();
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const err = new Error('bbo');
    err.status = 699;
    throw err;

    const result = await db.getCustomer(name);
    if (Object.keys(result).length === 0) {
      res.status(404).send();
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
