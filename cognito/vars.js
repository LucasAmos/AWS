const vars = {
  CUSTOMERS_TABLE: process.env.DYNAMODB_TABLE,
  REGION: 'eu-west-1',
  USERPOOL: process.env.USERPOOL,
  APP_CLIENT: process.env.CLIENT_ID,
};
module.exports = vars;
