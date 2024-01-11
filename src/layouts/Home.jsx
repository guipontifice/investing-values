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
    <div className='flex flex-row'>
      <div className='m-20 p-3'>
        <div className='flex flex-row m-2'>
          <h2>Nome</h2>
          <p>Valor</p>
          <p>Variação</p>
          <p>Var%</p>
          <p>Abertura</p>
          <p>Máx</p>
          <p>Mín</p>
          <p>Anterior</p>
        </div>
        {stocks ? (
          stocks.map((stock, index) => (

            <div key={index} className='flex border-2'>
              <div className='flex flex-row'>
                <h2 className='m-2'>{stock.name}</h2>
                <p>{stock.value}</p>
                <p className={(1 /(stock.variation * 0)) === 1/0 ? 'text-black' : 'text-red'}>{stock.variation}</p>
                <p className={(1 /(stock.varPercent * 0)) === 1/0 ? 'text-black' : 'text-red'}>{stock.varPercent}%</p>
                <p className={(1 /(stock.opening * 0)) === 1/0 ? 'text-black' : 'text-red'}>{stock.opening}</p>
                <p>{stock.max}</p>
                <p>{stock.min}</p>
                <p>{stock.previous}</p>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Home;