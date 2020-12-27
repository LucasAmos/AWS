const express = require('express');
const accounts = require('./accounts');
const customers = require('./customers');

const server = express();

server.use('/accounts', accounts);
server.use('/customers', customers);

module.exports = server;
