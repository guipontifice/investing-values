import React, { useState, useEffect } from 'react';
import Axios from 'axios';
function Home() {
  const [stocks, setStocks] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get('/api/stocks');
      setStocks(data);
      console.log(stocks)
    };
    fetchData()
  }, []);

  return (
    <div>
      {stocks ? (
        stocks.map((stock, index) => (
          <div key={index}>
            <h2>{stock.name}</h2>
            <p>Value: {stock.value}</p>
            <p>Valuation: {stock.valuation}</p>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Home;