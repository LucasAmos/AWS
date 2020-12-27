const express = require('express');
const cors = require('cors');
const v1 = require('./controllers/v1');
const v2 = require('./controllers/v2');

const errorHandler = require('./middleware/errorHandler');

const server = express();
server.use(cors());
server.use(express.urlencoded({ extended: true, strict: false }));
server.use(express.json());

server.use('/v1', v1);
server.use('/v2', v2);
server.use(errorHandler);

server.listen('9000');
module.exports = server;
