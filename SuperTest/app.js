const express = require("express");
const bodyParser = require("body-parser");
let app;
app = express();
app.use(bodyParser.json());

module.exports = app;
