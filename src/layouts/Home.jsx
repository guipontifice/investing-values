import React, { useState, useEffect } from 'react';
import Axios from 'axios';
function Home() {
  const [stocks, setStocks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get('/api/stocks');
      setStocks(data);
      console.log(stocks)
    };
    fetchData()
  }, []);

  return (
    <div className='flex flex-row w-full justify-center'>

      <div className='flex flex-col p-3 '>
        <input
          type='text'
          placeholder='Pesquisar Ação'
          className='flex w-full mb-5 border-2 p-1'
          onChange={(event) => setQuery(event.target.value)} />

        <div className='grid grid-cols-9 gap-4 items-center border-2 mb-3'>
          <h2 className='col-span-2 mx-2'>Nome</h2>
          <p className='m-2'>Valor</p>
          <p className='m-2'>Variação</p>
          <p className='m-2'>Var%</p>
          <p className='m-2'>Abertura</p>
          <p className='m-2'>Máx</p>
          <p className='m-2'>Mín</p>
          <p className='m-2'>Anterior</p>
        </div>
        {stocks ? (
          stocks.filter(stock => 
            stock.name.toLowerCase().includes(query)
          ).map((stock, index) => (
            <div key={index} className='flex border-2 mb-1 text-xs hover:scale-110'>
              <div key={index} className='w-full grid grid-cols-9 gap-3 items-center'>
                <h2 className='col-span-2 mx-2'>{stock.name}</h2>
                <p className='align-middle flex flex-col m-5'>{stock.value}</p>
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