import axios from 'axios';
import cheerio, { load } from 'cheerio';

async function fetchPage(url: string) {
  const { data } = await axios.get(url, {
    headers: {
    'User-Agent': 'FurnitureResearchBot/1.0' //specify for what purpose we are scraping
}});
  return load(data);
}

async function scrapePrices(url: string): Promise<number[]> {
  const prices: number[] = [];
  let nextPageExists = true;
  let pageNumber = 1;

  while (nextPageExists && pageNumber < 11) { //page number limit so we dont scrape close to 10k products in some cases
    const pageUrl = pageNumber === 1 ? url : `${url}&page=${pageNumber}`;
    const $ = await fetchPage(pageUrl);

    $('article.relative.sf-search-ad.card.card--cardShadow.s-bg').each((_, element) => {
      const title = $(element).find('h2.h4.mb-0.break-words a.sf-search-ad-link').text().trim();
      const priceText = $(element).find('div.mt-16.flex.justify-between.sm\\:mt-8.space-x-12.font-bold.whitespace-nowrap span').text();
      let price = parseFloat(priceText.replace('€', '').replace(',', '.').trim());
      
      //search for mentions of kappalemäärä or kpl in the title, then divide the price per product if found
      const kplMatch = title.match(/(\d+)\s*kpl/);
      if (kplMatch) {
        const kpl = parseInt(kplMatch[1], 10);
        price = price / kpl;
      }

      if (!isNaN(price)) {
        prices.push(price);
      }
    });

    nextPageExists = $('nav').find('title').filter((_, el) => $(el).text() === 'Nuoli oikealle').length > 0;
    pageNumber++;
  }

  return prices;
}

export async function calculateAveragePrice(furnitureType?: string, brand?: string, model?: string): Promise<number | null> {
  let query = '';

  if (brand && model) {
    query = `${brand}+${model}`;
  } else {
    query = [brand, model, furnitureType].filter(Boolean).join('+');
  }

  const baseUrl = `https://www.tori.fi/recommerce/forsale/search?q=${query}`;
  const prices = await scrapePrices(baseUrl);

  if (prices.length === 0) {
    return null;
  }

  const total = prices.reduce((sum, price) => sum + price, 0);
  const average = total / prices.length;
  return average;
}