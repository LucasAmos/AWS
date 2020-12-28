const path = require('path');
const express = require('express');
const OpenApiValidator = require('express-openapi-validator');
const accounts = require('./accounts');
const customers = require('./customers');
const auth = require('./auth');
const server = express();
const spec = path.join(__dirname, './openapi.yaml');
server.use(
  OpenApiValidator.middleware({
    apiSpec: spec,
  })
);

server.use('/accounts', accounts);
server.use('/customers', customers);
server.use('/auth', auth);

module.exports = server;
