import React, { Component } from 'react';
import Ticker from './components/Ticker';
import Balance from './components/Balance';

import './App.css';

import Kraken from './components/Kraken';
const kraken = new Kraken();

class App extends Component {
 
  //const [ticker, setTicker] = useState(0);
   state = {
    ticker: null,
    balance: null,
    //setTicker: setTicker,
  }

  setTicker = async() => {  
    let ticker={
      pair: 'XXBTZEUR',
      data: null
    };

    const result = await kraken.getTicker(ticker.pair);
    ticker.data = result.data.result.XXBTZEUR;
    console.log('App', ticker);
    this.setState({ticker : ticker});
  }

  setBalance = async() => {  
    const result = await kraken.getBalance('');
    this.setState({balance : result.data.result});
  }

  handleTickerClick = async() => {  
    console.log('App', 'handleTickerClick');
    this.setTicker();
  }

  handleBalanceClick = async() => {  
    console.log('App', 'handleBalanceClick');
    this.setBalance();
  }

  componentDidMount = async() => {
    console.log('App', 'componentDidMount');
    this.setTicker();
    this.setBalance();
  }

  render() {
      //const tickerProps=test_dataTicker.result.XXBTZEUR;
      return (    
        <div className="App">
          <Ticker ticker={this.state.ticker} onClick={this.handleTickerClick}/>
          <Balance balance={this.state.balance} onClick={this.handleBalanceClick}/>
        </div>
      );
  }
}

export default App;
