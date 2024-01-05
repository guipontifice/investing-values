import puppeteer from 'puppeteer';
import urlLink from './urlLink.js'
async function scrapeSite() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = urlLink();
  await page.goto(url);

  await page.waitForSelector('div', { timeout: 2000 });
  const stocksEval = await page.evaluate(() => {
    const stocks = [];
    document.querySelectorAll('div').forEach((elem) => {
      try {
        const name = elem.querySelector('a').outerText;
        const value = elem.querySelector('#widget-market-quotes-container > div > div.market-quotes-widget__symbols > div:nth-child(2) > div.market-quotes-widget__field--block > div.market-quotes-widget__field.market-quotes-widget__field--last.market-quotes-widget__field--row-cell').outerText;
        console.log('nome:', name, 'valor:', value);
        stocks.push({ name, value });
      } catch (error) {
        console.error('Error scraping stock data:', error);
      }
    });
    return stocks;
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
