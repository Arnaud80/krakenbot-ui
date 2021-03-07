//kraken-config.js
const secret = require('./kraken-secret');

const config = {
  
  public_key: secret.public_key, // API Key
  private_key: secret.private_key, // API Private Key    
  url: 'https://api.kraken.com', // URL of the Kraken API
  public: {
    tickerURI: '/0/public/Ticker', // Ticker URI with xbteur parameter
  },
  private: {
    balanceURI: '/0/private/Balance', // Balance URI
    tradesHistoryURI : '/0/private/TradesHistory', // Trades History URI
    addOrderURI : '/0/private/AddOrder', // add Order URI
  }
}

module.exports = config