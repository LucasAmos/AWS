const guard = require('express-jwt-permissions')();
const express = require('express');
const DynamoDB = require('../../services/dynamodb');
const auth = require('../../middleware/auth');
const router = express.Router();
const db = new DynamoDB();

// All endpoints are prepended with /customers
router.use('/', auth);

router.get('/', guard.check('admin'), async (req, res, next) => {
  try {
    const result = await db.getCustomers();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:name', guard.check('admin'), async (req, res) => {
  const { name } = req.params;
  try {
    const result = await db.getCustomer(name);
    if (Object.keys(result).length === 0) {
      res.status(404).send();
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
