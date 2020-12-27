const { REGION, CUSTOMERS_TABLE } = require('../vars');
const AWS = require('aws-sdk');
AWS.config.update({ region: REGION });

class DynamoDB {
  constructor() {
    this.db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
  }

  async getCustomers() {
    const params = {
      TableName: CUSTOMERS_TABLE,
    };
    return this.db.scan(params).promise();
  }

  async getCustomer(name) {
    const params = {
      TableName: CUSTOMERS_TABLE,
      Key: { name },
    };
    return this.db.get(params).promise();
  }
}

module.exports = DynamoDB;
