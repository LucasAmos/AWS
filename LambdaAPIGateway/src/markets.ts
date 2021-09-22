import axios, { AxiosResponse } from 'axios';
import { parse, HTMLElement } from 'node-html-parser';
import { Market } from './types/Market';

async function fetch(): Promise<AxiosResponse> {
  try {
    return axios.get('https://www.bbc.co.uk/news/business/market-data');
  } catch (error: any) {
    throw new Error(error);
  }
}

async function getMarkets(): Promise<Market[]> {
  const TABLE_CLASS: string = '.nw-c-md-overview-table__row';
  const html: AxiosResponse = await fetch();
  const root = parse(html.data);

  const markets = [];

  for (let i = 0; i < 13; i++) {
    const row: HTMLElement = root.querySelectorAll(TABLE_CLASS)[i];
    const name: string = row
      .querySelector('.nw-c-md-overview-table__link')
      .querySelector('span').text;

    const percentChange: string = root
      .querySelectorAll(TABLE_CLASS)
      [i].querySelectorAll('.nw-c-md-overview-table__cell-inner')[1].text;

    const price: number = root
      .querySelectorAll(TABLE_CLASS)
      [i].querySelectorAll('.nw-c-md-overview-table__cell-inner')[2].text as unknown as number;
    const absoluteChange: number = root
      .querySelectorAll(TABLE_CLASS)
      [i].querySelectorAll('.nw-c-md-overview-table__cell-inner')[3].text as unknown as number;

    markets.push({
      name: name.replace(/\s/g, '').toUpperCase(),
      price,
      percentChange,
      absoluteChange
    });
  }

  return markets;
}

export { fetch, getMarkets };
