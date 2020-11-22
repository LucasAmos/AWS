import AWS from "aws-sdk";

AWS.config.update({ region: process.env.AWS_REGION });
const SM = new AWS.SecretsManager();

export default async function handler(): Promise<string> {
  const { SecretString } = await SM.getSecretValue({
    SecretId: "secret1",
  }).promise();
  const { SecretString: SecretString2 } = await SM.getSecretValue({
    SecretId: "secret2",
  }).promise();

  return `${SecretString} and ${SecretString2}`;
}
