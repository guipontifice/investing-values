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
    <div className='flex flex-row w-full'>
      <div className='flex flex-col p-3'>
        <div className='grid grid-cols-9 gap-4 items-center'>
          <h2 className='col-span-2 mx-2'>Name</h2>
          <p className='m-2'>Valor</p>
          <p className='m-2'>Variação</p>
          <p className='m-2'>Var%</p>
          <p className='m-2'>Abertura</p>
          <p className='m-2'>Máx</p>
          <p className='m-2'>Mín</p>
          <p className='m-2'>Anterior</p>
        </div>
        {stocks ? (
          stocks.map((stock, index) => (
            <div key={index} className='flex border-2'>
              <div key={index} className='grid grid-cols-9 gap-4 items-center'>
                <h2 className='col-span-2 mx-2'>{stock.name}</h2>
                <p className='m-5'>{stock.value}</p>
                <p className={`m-5 ${((1 / (stock.variation * 0)) === 1 / 0 ? 'text-black' : 'text-red')}`}>
                  {stock.variation}
                </p>
                <p className={`m-5 ${(1 / (stock.varPercent * 0)) === 1 / 0 ? 'text-black' : 'text-red'}`}>{stock.varPercent}%</p>
                <p className={`m-5 ${(1 / (stock.opening * 0)) === 1 / 0 ? 'text-black' : 'text-red'}`}>{stock.opening}</p>
                <p className='m-5'>{stock.max}</p>
                <p className='m-5'>{stock.min}</p>
                <p className='m-5'>{stock.previous}</p>
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