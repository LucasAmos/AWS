// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');

const { REGION } = require('../vars');

exports.cognito = new AWS.CognitoIdentityServiceProvider({ region: REGION });
