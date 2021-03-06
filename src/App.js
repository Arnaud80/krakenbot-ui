import React, { useEffect, useState } from 'react';
import Ticker from './components/Ticker';
import Balance from './components/Balance';

import './App.css';
import 'typeface-roboto';
import 'typeface-roboto-condensed';


import Kraken from './components/Kraken';
import { VtmnButton } from '@vtmn/react';

const kraken = new Kraken();

const App = () => {
 
  const [ticker, setTicker] = useState(null);
  const [balance, setBalance] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect( () => {
    if(autoRefresh) {
      console.log('App', 'Rendered...');
      const timerId = setTimeout(() => {
        updateTicker();
        updateBalance();
      }, 5000);
      return () => clearTimeout(timerId);
    }
  });

  const updateTicker = async() => {  
    let newTicker={
      pair: 'XXBTZEUR',
      //lastData: null,
      //data: null
    };

    const result = await kraken.getTicker(newTicker.pair);
    newTicker.data = result.data.result.XXBTZEUR;

    // Save the last result, before to update data
    try {
      newTicker.lastData = ticker.data;
      newTicker.lastTradeStatus = newTicker.lastData.c[0] > newTicker.data.c[0] ? 'higher' : 'lower';
    } catch {
      newTicker.lastData = null;
      newTicker.lastTradeStatus = 'unknow'
    }

    setTicker(newTicker);
  }

  const updateBalance = async() => {  
    const result = await kraken.getBalance('');
    let balance = result.data.result;

    setBalance(balance);
  }

  const handleTickerClick = async() => {  
    console.log('App', 'handleTickerClick');
    updateTicker();
  }

  const handleBalanceClick = async() => {  
    console.log('App', 'handleBalanceClick');
    updateBalance();
  }

/*  const componentDidMount = async() => {
    console.log('App', 'componentDidMount');
    setTicker();
    setBalance();
  }*/

  return (    
      <div className="App">
        <Ticker ticker={ticker} onClick={handleTickerClick}/>
        <Balance balance={balance} onClick={handleBalanceClick}/>
        <VtmnButton autoRefresh={autoRefresh} onClick={() => setAutoRefresh(autoRefresh?false:true)}>{autoRefresh?'Stop autoRefresh':'Start autoRefresh'}</VtmnButton>
      </div>
    );
}

export default App;
