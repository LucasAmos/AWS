const express = require("express");
const accounts = require("./accounts");
const customers = require("./customers");
const auth = require("./auth");

const server = express();

server.use("/accounts", accounts);
server.use("/customers", customers);
server.use("/auth", auth);

module.exports = server;
