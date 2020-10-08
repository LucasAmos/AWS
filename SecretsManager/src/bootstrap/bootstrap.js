const AWS = require("aws-sdk");
const client = new AWS.SecretsManager({ region: "eu-west-1" });

async function getSecret() {
  const secret = process.env["STORED_SECRET"];

  if (secret) {
    console.log("*** SECRET WAS IN THE CACHE");
    return secret;
  }

  const { SecretString } = await client.getSecretValue({ SecretId: process.env.SECRET_ID }).promise();
  console.log("*** SECRET WAS FETCHED FROM SECRETS MANAGER");
  return SecretString;
}

async function bootstrap() {
  const secret = await getSecret();
  process.env.STORED_SECRET = secret;
}

module.exports = { bootstrap, getSecret };
