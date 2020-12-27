// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');

const { REGION } = require('../vars');

module.exports = new AWS.CognitoIdentityServiceProvider({ region: REGION });
