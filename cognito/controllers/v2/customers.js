const express = require("express");
const DynamoDB = require("../../services/dynamodb");
const router = express.Router();
const db = new DynamoDB();

// All endpoints are prepended with /customers

router.get("/", async (req, res) => {
  try {
    const result = await db.getCustomers();
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
