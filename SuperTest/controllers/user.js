var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  return res.json("Return all the users");
});

router.get("/:id", function (req, res) {
  if (req.params.id === "user1") {
    return res.json("user 1 returned");
  }
  return res.status(404).json("user not found");
});

router.post("/", function (req, res) {
  let content = req.body;
  if (content.id) {
    return res.status(201).json({ id: "user1" });
  }
  return res.status(400).json("User could not be created");
});

module.exports = router;
