import React, { useEffect, useState } from 'react';
import Ticker from './components/Ticker';
import Balance from './components/Balance';

import './App.css';
import 'typeface-roboto';
import 'typeface-roboto-condensed';

import Kraken from './components/Kraken';
import {ALTpairs, EURpairs } from './components/Kraken';
import { Button } from 'react-bootstrap';

const kraken = new Kraken();

const App = () => {
  const [currentPair, setcurrentPair] = useState('XBTEUR');
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
        updateBalance();
      }, 5000);
      return () => clearTimeout(timerId);
    }
  });

  useEffect( () => {
    console.log('App - UseEffect','currentPair');
    updateTicker();    
    // As we need updateTicker for manual refresh, we disable the warning for the previous line.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPair]);

  // Executed one time
  useEffect( () => {
    console.log('App - UseEffect','one time executed to load TradesHistory');
    updateTradesHistory();
  }, [])

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
    let apiReturn = await kraken.getBalance('');
    let result = apiReturn.data.result;
    let newBalance = [];

    // First loop on API Balance return to prepare the newBalance
    // TODO : Refactoring - Check if we can do better by using object key/value insteed Array
    // Maybe by using 4 Arrays named Asset, Pair, Volume and Value
    newBalance=Object.keys(result).filter(key => result[key]>=0.0001).map((key, i) => {
      //console.log("App - updateBalance - DEBUG key=",key)
      let pair=EURpairs[key];

      let eltBalance=[
        //'asset' : 
        key,
        //'pair' : 
        pair,
        //'volume' :
        result[key],
        //'value' :
        ''
      ];

      return eltBalance;
    });

    // Second loop needed because await call is not possible in lambda loop
    for(let i=0;i<newBalance.length;i++) {
      apiReturn = await kraken.getTicker(newBalance[i][1]);
      console.log("App - updateBalance - DEBUG apiReturn=",apiReturn);

      let ticker = apiReturn.data.result[ALTpairs[newBalance[i][1]]];
      newBalance[i][3] = ticker.c[0];
    }

    setBalance(newBalance);
  }

  const updateTradesHistory = async() => {  
    const result = await kraken.getTradesHistory();
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

  const handleOnSell = async(pair, price, volume) => {
    console.log('App', 'handleOnSell ' + pair + ' at ' + price + 'for ' + volume);
    //sendAddOrder(asset, pair, 'sell', 'limit', price.toFixed(2), volume);
  }

  return (    
      <div className="App">
        <Ticker ticker={ticker} onClick={handleTickerClick}/>
        <Balance balance={balance} tradesHistory={tradesHistory} onClick={handleBalanceClick}/>
        
        <Button variant="primary" autorefresh={autorefresh} onClick={() => setAutoRefresh(autorefresh==='active'?'disable':'active')}>
          {autorefresh==='active'?'Stop Auto Refresh':'Start Auto Refresh'}
        </Button>
      </div>  
    );
}      

export default App;
