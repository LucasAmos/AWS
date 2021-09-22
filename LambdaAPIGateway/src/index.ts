import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getMarkets } from './markets';
import { Market } from './types/Market';

async function fetchMarkets(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const prices = await getMarkets();
  return {
    statusCode: 200,
    body: JSON.stringify(prices)
  };
}

async function fetchMarket(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const { pathParameters } = event;

  if (pathParameters && pathParameters.id) {
    const { id } = pathParameters;
    const prices = await getMarkets();
    const price = prices.filter((share: Market) => share.name === id);

    if (price.length === 1) {
      return {
        statusCode: 200,
        body: JSON.stringify(price[0])
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'invalid symbol' })
      };
    }
  }
  return {
    statusCode: 500,
    body: JSON.stringify({ error: 'bad error' })
  };
}
export { fetchMarkets, fetchMarket };
