const guard = require("express-jwt-permissions")();
const express = require("express");
const DynamoDB = require("../../services/dynamodb");
const auth = require("../../middleware/auth");
const router = express.Router();
const db = new DynamoDB();

// All endpoints are prepended with /customers
router.use("/", auth);

router.get("/", guard.check("admin"), async (req, res) => {
  try {
    const result = await db.getCustomers();
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
