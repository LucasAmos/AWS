import { fetch, getMarkets } from './markets';

it('fetch', async () => {
  const { status } = await fetch();

  expect(status).toBe(200);
});

it.only('getPrices', async () => {
  const prices: any = await getMarkets();

  console.log(prices);

  // prices.forEach((element: any) => {
  //   console.log(element);
  // });
  expect(1).toBe(1);
});
