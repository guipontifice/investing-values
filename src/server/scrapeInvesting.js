import puppeteer from 'puppeteer';
import urlLink from './urlLink.js'
async function scrapeSite() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = urlLink();
  await page.goto(url);

  await page.waitForSelector('#widget-market-quotes-container > div > div.market-quotes-widget__symbols', { timeout: 2000 });
  const stocksEval = await page.evaluate(() => {
    const stocks = [];
    document.querySelectorAll('#widget-market-quotes-container > div > div.market-quotes-widget__symbols').forEach((elem) => {
      try {
        const name = elem.querySelector('a').outerText;
        const value = elem.querySelector('div.js-symbol-last.market-quotes-widget__ellipsis-value').outerText;
        stocks.push({ name, value });
        console.log('nome:', name, 'value: ', value);
        //it worked, showed me values, but only one name, then it didn't show anymore
      } catch (error) {
        console.error('Error scraping stock data:', error);
      }
      return stocks;
    });
  });
  await browser.close();
  return stocksEval;
}
// async function scrapeSite() {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto('https://www.b3.com.br/pt_br/market-data-e-indices/servicos-de-dados/market-data/cotacoes/indices.htm');


export default scrapeSite;

// document.querySelectorAll('.tr').forEach((elem) => {
//   const name = elem.querySelector('.bold left noWrap el plusIconTd a').innerText;
//   const value = elem.querySelector('.genTbl td').innerText;
//   const valuation = elem.querySelector('.genTbl td bold redFont').innerText;
