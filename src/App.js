import React, { useEffect, useState } from 'react';
import Ticker from './components/Ticker';
import Balance from './components/Balance';
import TradesHistory from './components/TradesHistory';

import './App.css';
import 'typeface-roboto';
import 'typeface-roboto-condensed';

import Kraken from './components/Kraken';
import { VtmnButton } from '@vtmn/react';
import homeline from '@vtmn/icons/dist/vitamix/svg/home-line.svg';
/*import playline from '@vtmn/icons/dist/vitamix/svg/play-line.svg';
import pauseline from '@vtmn/icons/dist/vitamix/svg/pause-line.svg';*/

const kraken = new Kraken();

const App = () => {
 
  const [ticker, setTicker] = useState(null);
  const [balance, setBalance] = useState(null);
  const [tradesHistory, setTradesHistory] = useState(null);
  const [autorefresh, setAutoRefresh] = useState('active');

  useEffect( () => {
    if(autorefresh==='active') {
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
      pair: 'BCHEUR',
      //lastData: null,
      //data: null
    };

    const result = await kraken.getTicker(newTicker.pair);
    newTicker.data = result.data.result.BCHEUR;

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

  const updateTradesHistory = async() => {  
    const result = await kraken.getTradesHistory('');
    let tradesHistory = result.data.result;

    setTradesHistory(tradesHistory);
  }

  const sendAddOrder = async(asset, pair, type, orderType, price, volume) => {
    let result = await kraken.getBalance('');
    let balance = result.data.result;

    console.log('sendAddOrder - balance[pair]',balance);
    console.log('sendAddOrder - balance[pair]',balance[asset]);

    result = await kraken.addOrder(pair, type, orderType, price, balance[asset]);
    let addOrder = result.data.result;

    console.log('sendAddOrder',addOrder);
  }

  const handleTickerClick = async() => {  
    console.log('App', 'handleTickerClick');
    updateTicker();
  }

  const handleBalanceClick = async() => {  
    console.log('App', 'handleBalanceClick');
    updateBalance();
  }

  const handleTradesHistoryClick = async() => {  
    console.log('App', 'handleTradesHistoryClick');
    updateTradesHistory();
  }

  const handleOnSell = async(asset, pair, price, volume) => {
    console.log('App', 'handleOnSell ' + pair + ' at ' + price + 'for ' + volume);
    sendAddOrder(asset, pair, 'sell', 'limit', price.toFixed(2), volume);
  }

  return (    
      <div className="App">
        <div>
          <img
            key="home-line" src={homeline}
            alt="home-line" width="32" height="32"
          />
        </div>
        <Ticker ticker={ticker} onClick={handleTickerClick}/>
        <Balance balance={balance} onClick={handleBalanceClick}/>
        <TradesHistory tradesHistory={tradesHistory} onClick={handleTradesHistoryClick} onSell={handleOnSell}/>
        <VtmnButton autorefresh={autorefresh} onClick={() => setAutoRefresh(autorefresh==='active'?'disable':'active')}>
          {autorefresh==='active'?'Stop Auto Refresh':'Start Auto Refresh'}
        </VtmnButton>
      </div>  
    );
}

export default App;
