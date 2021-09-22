import { getPrice } from './index';
const getPriceEvent: any = {
  resource: '/product',
  path: '/product',
  httpMethod: 'GET',
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'GB',
    'Content-Type': 'application/json',
    Host: 'th45hw0c1f.execute-api.eu-west-1.amazonaws.com',
    'Postman-Token': '48e1ce90-f0c7-4fed-afd9-92d872a6ba7c',
    'User-Agent': 'PostmanRuntime/7.28.4',
    Via: '1.1 efa3f650322a17dcd37faac064c8c2c7.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'tzSZR6xGsFuwZTJex1yZ2b-GWyWwcWgNTPEk7o6vagTxrM-t_9hT2A==',
    'X-Amzn-Trace-Id': 'Root=1-612eb83e-1ca7f0ea544536d73e045eaf',
    'X-Forwarded-For': '185.59.221.243, 130.176.6.134',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https'
  },
  multiValueHeaders: {
    Accept: ['*/*'],
    'Accept-Encoding': ['gzip, deflate, br'],
    'CloudFront-Forwarded-Proto': ['https'],
    'CloudFront-Is-Desktop-Viewer': ['true'],
    'CloudFront-Is-Mobile-Viewer': ['false'],
    'CloudFront-Is-SmartTV-Viewer': ['false'],
    'CloudFront-Is-Tablet-Viewer': ['false'],
    'CloudFront-Viewer-Country': ['GB'],
    'Content-Type': ['application/json'],
    Host: ['th45hw0c1f.execute-api.eu-west-1.amazonaws.com'],
    'Postman-Token': ['48e1ce90-f0c7-4fed-afd9-92d872a6ba7c'],
    'User-Agent': ['PostmanRuntime/7.28.4'],
    Via: ['1.1 efa3f650322a17dcd37faac064c8c2c7.cloudfront.net (CloudFront)'],
    'X-Amz-Cf-Id': ['tzSZR6xGsFuwZTJex1yZ2b-GWyWwcWgNTPEk7o6vagTxrM-t_9hT2A=='],
    'X-Amzn-Trace-Id': ['Root=1-612eb83e-1ca7f0ea544536d73e045eaf'],
    'X-Forwarded-For': ['185.59.221.243, 130.176.6.134'],
    'X-Forwarded-Port': ['443'],
    'X-Forwarded-Proto': ['https']
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: { id: 'FTSE100' },
  stageVariables: null,
  requestContext: {
    resourceId: '17o6j0',
    resourcePath: '/price',
    httpMethod: 'GET',
    extendedRequestId: 'E9G5wFm2joEF0zw=',
    requestTime: '31/Aug/2021:23:16:14 +0000',
    path: '/prod/product',
    accountId: '369208607636',
    protocol: 'HTTP/1.1',
    stage: 'prod',
    domainPrefix: 'th45hw0c1f',
    requestTimeEpoch: 1630451774298,
    requestId: '85c9394a-ac08-4677-9cae-6dd5efae7253',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '185.59.221.243',
      principalOrgId: null,
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'PostmanRuntime/7.28.4',
      user: null
    },
    domainName: 'th45hw0c1f.execute-api.eu-west-1.amazonaws.com',
    apiId: 'th45hw0c1f'
  },
  isBase64Encoded: false
};

it.only('getPrices', async () => {
  const price: any = await getPrice(getPriceEvent);

  expect(price).toBe(1);
});
