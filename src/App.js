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
  const [tickers, setTickers] = useState(null);
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
    const result = await kraken.getBalance('');
    let balance = result.data.result;
    let pairList = [];
        
    //console.log("App - updateBalance - DEBUG balance=",balance);
    Object.keys(balance).map((key, i) => (
      //console.log("App - updateBalance - DEBUG key=",key)
      pairList[i]=EURpairs[key]
    ));

    updateTickers(pairList);

    setBalance(balance);
  }

  const updateTickers = async(pairList) => {
    let result=null;
    let tickersArray = [];
      
    //console.log("App - updateTickers - pairList=",pairList);
    //console.log("App - updateTickers - pairList.length=",pairList.length);

    // We start at one one to avoid pair EUREUR
    // TODO : Refactoring needed
    for(let i=1; i<pairList.length;i++) {
      let ticker={
        //pair: pairList,
        //lastData: null,
        //data: null
      };

      ticker.pair=pairList[i];
      //console.log("App - updateTickers - pair=",ticker.pair);
      
      result = await kraken.getTicker(ticker.pair);
      ticker.data = result.data.result[ALTpairs[ticker.pair]];
      tickersArray[i-1] = ticker;
      //console.log("App - updateTickers - ticker.data=",ticker.data);
    }
    
    console.log("App - updateTickers - tickersArray=",tickersArray);
    setTickers(tickersArray);
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
    if(pair!=null) setcurrentPair(pair);
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
        <Balance balance={balance} tickers={tickers} tradesHistory={tradesHistory} onClick={handleBalanceClick}/>
        
        <Button variant="primary" autorefresh={autorefresh} onClick={() => setAutoRefresh(autorefresh==='active'?'disable':'active')}>
          {autorefresh==='active'?'Stop Auto Refresh':'Start Auto Refresh'}
        </Button>
      </div>  
    );
}      

export default App;
