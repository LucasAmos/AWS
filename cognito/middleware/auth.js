const CognitoExpress = require('cognito-express');
const { REGION, USERPOOL } = require('../vars');

const cognitoExpress = new CognitoExpress({
  region: REGION,
  cognitoUserPoolId: USERPOOL,
  tokenUse: 'id',
  tokenExpiration: 3600000,
});

const auth = async (req, res, next) => {
  try {
    const { idtoken } = req.headers;
    if (!idtoken) {
      const err = new Error();
      err.code = 'permission_denied';
      next(err);
    } else {
      const token = await cognitoExpress.validate(idtoken);
      const { email: username } = token;
      const permissions = token['cognito:groups'] ? token['cognito:groups'] : [];

      const user = { permissions, username };
      user.id = () => username;
      user.inGroup = group => user.permissions.includes(group);
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
