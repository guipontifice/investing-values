import puppeteer from 'puppeteer';
import urlLink from './urlLink.js'
async function scrapeSite() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = urlLink();
  await page.goto(url);

  // await page.waitForSelector('div.js-symbol-last.market-quotes-widget__ellipsis-value', { timeout: 20000 });
  await page.waitForTimeout(5000)
  const stocksEval = await page.evaluate(() => {
    const stocks = [];
    document.querySelectorAll('.market-quotes-widget__row').forEach((elem) => {
      try {
        const name = elem.querySelector('a').outerText;
        const value = elem.querySelector('div.js-symbol-last.market-quotes-widget__ellipsis-value').outerText;
        const variation = elem.querySelector('div.market-quotes-widget__field--block > div.market-quotes-widget__field.market-quotes-widget__field--change.market-quotes-widget__field--row-cell > div').outerText;
        const varPercent = elem.querySelector('div.market-quotes-widget__field--block > div.market-quotes-widget__field.market-quotes-widget__field--open.market-quotes-widget__field--row-cell > div').outerText;
        const opening = elem.querySelector('div.market-quotes-widget__field--block > div.market-quotes-widget__field.market-quotes-widget__field--open.market-quotes-widget__field--row-cell > div').outerText;
        const max = elem.querySelector('div.market-quotes-widget__field--block > div.market-quotes-widget__field.market-quotes-widget__field--high.market-quotes-widget__field--row-cell > div').outerText;
        const min = elem.querySelector('div.market-quotes-widget__field--block > div.market-quotes-widget__field.market-quotes-widget__field--low.market-quotes-widget__field--row-cell > div').outerText;
        const previous = elem.querySelector('div.market-quotes-widget__field--block > div.market-quotes-widget__field.market-quotes-widget__field--close.market-quotes-widget__field--row-cell > div').outerText;
        console.log('nome:', name, 'value: ', value, 'variation: ', variation, 'varPercent: ', varPercent, 'opening: ', opening, 'max: ', max, 'min: ', min, 'previous: ', previous);
        stocks.push({ name, value, variation, varPercent, opening, max, min, previous });
        //it worked, showed me values, but only one name, then it didn't show anymore, and then showed again/error
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
