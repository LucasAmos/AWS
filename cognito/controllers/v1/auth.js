const AWS = require('aws-sdk');
const express = require('express');
const { decodeCredentials } = require('../../utils');
// const cognito = require('../../services/cognito');
const { REGION } = require('../../vars');

const cognito = new AWS.CognitoIdentityServiceProvider({ region: REGION });

const { APP_CLIENT } = require('../../vars');

const router = express.Router();

router.post(
  '/initiateauth',
  function(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      const err = new Error('auth header is missing');
      err.status = 403;
      next(err);
    } else {
      next();
    }
  },
  async function(req, res, next) {
    try {
      const { authorization } = req.headers;
      const [USERNAME, PASSWORD] = decodeCredentials(authorization);
      const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: APP_CLIENT,
        AuthParameters: {
          USERNAME,
          PASSWORD,
        },
      };
      const result = await cognito.initiateAuth(params).promise();
      res.json(result);
    } catch (error) {
      next(new Error('Auth initiation failed'));
    }
  }
);

router.post('/respondtoauthchallenge', async function(req, res, next) {
  try {
    const { ChallengeName, ChallengeResponses, Session } = req.body;
    var params = {
      ChallengeName,
      ClientId: APP_CLIENT,
      ChallengeResponses,
      Session,
    };

    const result = await cognito.respondToAuthChallenge(params).promise();
    res.json(result);
  } catch (error) {
    if (error.code === 'MissingRequiredParameter' || error.code === 'NotAuthorizedException') {
      const err = new Error(error.message);
      err.status = 400;
      next(err);
    } else {
      next(new Error('Auth response failed'));
    }
  }
});

module.exports = router;
