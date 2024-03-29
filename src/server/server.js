import express from 'express';
import scrapeSite from './scrapeInvesting.js';

const app = express();

app.get('/api/stocks', async (req, res) => {
    try {
        console.log('test')
        const stocks = await scrapeSite();
        res.json(stocks);
        console.log('stocks', stocks)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});