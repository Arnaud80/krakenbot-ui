import React from 'react';

const statusColor = {
    'unknow': 'grey',
    'higher': 'red',
    'lower' : 'green',
}

const Ticker = props => {    
    /*
        <pair_name> = pair name
        a = ask array(<price>, <whole lot volume>, <lot volume>),
        b = bid array(<price>, <whole lot volume>, <lot volume>),
        c = last trade closed array(<price>, <lot volume>),
        v = volume array(<today>, <last 24 hours>),
        p = volume weighted average price array(<today>, <last 24 hours>),
        t = number of trades array(<today>, <last 24 hours>),
        l = low array(<today>, <last 24 hours>),
        h = high array(<today>, <last 24 hours>),
        o = today's opening price
    */
   
    const ticker = props.ticker;
    const tickerIsNull = ticker === null;

    console.log('Ticker', ticker);

    return (
        <div className='Ticker' onClick={props.onClick}>
            {tickerIsNull ? (
                <>...</>
            ) : (
                <div 
                    data-testid='ticker'
                    className='last_trade' 
                    style={{color : statusColor[ticker.lastTradeStatus]}}>
                    Last trade for {ticker.pair} = {ticker.data.c[0]}
                </div>
            )}
        </div>
    )
}

export default Ticker;