import React, { useEffect, useState } from 'react';
import Ticker from './components/Ticker';
import Balance from './components/Balance';
import OHLC from './components/OHLC';

import './App.css';
import 'typeface-roboto';
import 'typeface-roboto-condensed';

import Kraken, {ALTpairs, EURpairs } from './components/Kraken';
import { Button } from 'react-bootstrap';

const kraken = new Kraken();

const App = () => {
  const [currentPair, setcurrentPair] = useState('XBTEUR');
  const [ticker, setTicker] = useState(null);
  const [balance, setBalance] = useState(null);
  const [ohlcData, setOhlcData] = useState(null);
  const [tradesHistory, setTradesHistory] = useState(null);
  const [autorefresh, setAutoRefresh] = useState('active');

  useEffect( () => {
    console.log('App - UseEffect','all');
    if(autorefresh==='active') {
      const timerId = setTimeout(() => {
        updateTicker();
        updateBalance();
        updateOHLC();
      }, 5000);
      return () => clearTimeout(timerId);
    }
  });

  useEffect( () => {
    console.log('App - UseEffect','currentPair');
    updateTicker();
    updateBalance();
    updateOHLC();
    // As we need updateTicker for manual refresh, we disable the warning for the previous line.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPair]);

  // Executed one time
  useEffect( () => {
    console.log('App - UseEffect','one time executed to load TradesHistory');
    updateTradesHistory();
  }, [])

  const updateOHLC = async() => {  
    const APIreturn = await kraken.getOHLC(currentPair,'1',null);

    setOhlcData(APIreturn.data.result[ALTpairs[currentPair]]);
  }

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

      return [
        //'asset' : 
        key,
        //'pair' : 
        pair,
        //'volume' :
        result[key],
        //'value' :
        ''
      ];

    });

    // Second loop needed because await call is not possible in lambda loop
    for(let eltBalance of newBalance){
      apiReturn = await kraken.getTicker(eltBalance[1]);

      let thisTicker = apiReturn.data.result[ALTpairs[eltBalance[1]]];
      eltBalance[3] = thisTicker.c[0];
    }

    setBalance(newBalance);
  }

  const updateTradesHistory = async() => {  
    const result = await kraken.getTradesHistory();

    setTradesHistory(result.data.result);
  }

  const sendAddOrder = async(asset, pair, type, orderType, price, volume) => {
    let result = await kraken.getBalance('');
    let thisBalance = result.data.result;

    console.log('sendAddOrder - balance[pair]',thisBalance);
    console.log('sendAddOrder - balance[pair]',thisBalance[asset]);

    result = await kraken.addOrder(pair, type, orderType, price, thisBalance[asset]);
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
  }

  return (    
      <div className="App">
        <Ticker ticker={ticker} onClick={handleTickerClick}/>
        <OHLC ohlcData={ohlcData} />
        <Balance balance={balance} tradesHistory={tradesHistory} onClick={handleBalanceClick}/>
        <Button variant="primary" autorefresh={autorefresh} onClick={() => setAutoRefresh(autorefresh==='active'?'disable':'active')}>
          {autorefresh==='active'?'Stop Auto Refresh':'Start Auto Refresh'}
        </Button>
      </div>  
    );
}      

export default App;
