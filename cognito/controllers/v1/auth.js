const AWS = require("aws-sdk");
const express = require("express");
const { decodeCredentials } = require("../../utils");
// const cognito = require('../../services/cognito');
const { REGION } = require("../../vars");

const cognito = new AWS.CognitoIdentityServiceProvider({ region: REGION });

const { APP_CLIENT } = require("../../vars");

const router = express.Router();

router.post("/initiateauth", async (req, res) => {
  const { authorization } = req.headers;
  const [USERNAME, PASSWORD] = decodeCredentials(authorization);
  try {
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: APP_CLIENT,
      AuthParameters: {
        USERNAME,
        PASSWORD,
      },
    };
    const result = await cognito.initiateAuth(params).promise();
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/respondtoauthchallenge", async (req, res) => {
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
    res.status(500).json(error.message);
  }
});

module.exports = router;
