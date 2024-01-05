import puppeteer from 'puppeteer';
async function scrapeSite() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage(); // Create new page in puppeteer
  await page.goto('https://www.b3.com.br/pt_br/market-data-e-indices/servicos-de-dados/market-data/cotacoes/indices.htm'); // Go to the website
  await page.evaluate(() => {
    const stocks = [];
    document.querySelectorAll('.market-quotes-widget__row ').forEach((elem) => {
      const nameElem = elem.querySelector('.market-quotes-widget__field--name-row-cell a').innerText;
      const value = elem.querySelector('.js-symbol-last.market-quotes-widget__ellipsis-value').innerText;
      const valuation = elem.querySelector('.js-symbol-change.market-quotes-widget__ellipsis-value').innerText;
      const name = nameElem ? nameElem.innerText : '';
      stocks.push({ name, value, valuation });
    });
    return stocks;
  });
  await browser.close();

}
export default scrapeSite;
