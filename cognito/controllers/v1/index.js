const path = require('path');
const express = require('express');
const accounts = require('./accounts');
const customers = require('./customers');
const OpenApiValidator = require('express-openapi-validator');
const server = express();
const spec = path.join(__dirname, './openapi.yaml');
server.use(
  OpenApiValidator.middleware({
    apiSpec: spec,
  })
);

server.use('/accounts', accounts);
server.use('/customers', customers);

module.exports = server;
