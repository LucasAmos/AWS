const CognitoExpress = require("cognito-express");
const { REGION, USERPOOL } = require("../vars");

const cognitoExpress = new CognitoExpress({
  region: REGION,
  cognitoUserPoolId: USERPOOL,
  tokenUse: "id",
  tokenExpiration: 3600000,
});

const auth = async (req, res, next) => {
  try {
    const { idtoken } = req.headers;
    if (!idtoken) {
      res.status(403).send("Forbidden");
      next();
    } else {
      const token = await cognitoExpress.validate(idtoken);
      console.error(token);

      const { username } = token;
      const permissions = token["cognito:groups"] ? token["cognito:groups"] : [];

      const user = { permissions, username };
      user.id = () => username;
      user.inGroup = (group) => user.permissions.includes(group);
      req.user = user;
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(403).json(error);
  }
};

module.exports = auth;
