import React, { useEffect, useState } from 'react';
import Ticker from './components/Ticker';
import Balance from './components/Balance';
import TradesHistory from './components/TradesHistory';

import './App.css';
import 'typeface-roboto';
import 'typeface-roboto-condensed';

import Kraken from './components/Kraken';
import {ALTpairs } from './components/Kraken';
import { VtmnButton } from '@vtmn/react';
import homeline from '@vtmn/icons/dist/vitamix/svg/home-line.svg';
/*import playline from '@vtmn/icons/dist/vitamix/svg/play-line.svg';
import pauseline from '@vtmn/icons/dist/vitamix/svg/pause-line.svg';*/

const kraken = new Kraken();

const App = () => {
  const [currentPair, setcurrentPair] = useState('BCHEUR');
  const [ticker, setTicker] = useState(null);
  const [balance, setBalance] = useState(null);
  const [tradesHistory, setTradesHistory] = useState(null);
  const [autorefresh, setAutoRefresh] = useState('active');

  useEffect( () => {
    console.log('App - UseEffect','all');
    if(autorefresh==='active') {
      const timerId = setTimeout(() => {
        updateTicker();
        // To update only on time at the startup.
        if(balance===null) updateBalance();
      }, 5000);
      return () => clearTimeout(timerId);
    }
  });

  useEffect( () => {
    console.log('App - UseEffect','currentPair');
    updateTicker();    
    // As we need updateTicker manual refresh, we disable the warning for the previous line.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPair]);

  const updateTicker = async() => {  
    let newTicker={
      pair: currentPair,
      //lastData: null,
      //data: null
    };

    console.log('App - updateTicker :',newTicker.pair);
    const result = await kraken.getTicker(newTicker.pair);
    newTicker.data = result.data.result[ALTpairs[newTicker.pair]];

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

  const handleBalanceClick = async(pair) => {  
    setcurrentPair(pair);
    console.log('App - handleBalanceClick', pair);
    //updateBalance();
    //updateTicker();
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
