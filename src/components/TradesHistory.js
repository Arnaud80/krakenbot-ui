import React from 'react';
import { pairs } from './Kraken';

const getCostPrice = (pair, trades) => {
    let avg=0.0;
    let vol=0.0;
    let totalCost=0.0;

    const tradesArray=Object.keys(trades);

    tradesArray.forEach(trade => {
        if(trades[trade].pair===pair) {
            if(vol===0) {
                avg = parseFloat(trades[trade].price);
                vol = parseFloat(trades[trade].vol);
                totalCost = avg * vol;
            } else {
                vol = vol + parseFloat(trades[trade].vol) * (trades[trade].type==='buy'?1:-1);
                totalCost = totalCost + parseFloat(trades[trade].price) * parseFloat(trades[trade].vol);
                avg = totalCost / vol;
            }
        }
    });

    console.log('getCostPrice - avg', avg);
    return({'costPrice' : avg, 'volume' : vol});
}

const TradesHistory = props => {
    const tradesHistory=props.tradesHistory;
    const tradesHistoryIsNull = tradesHistory === null;

    let trades=null;
    let XXBTZEUR=0;
    let BCHEUR=0;
    let XDGEUR=0;
    let XXLMZEUR=0;
    
    if(!tradesHistoryIsNull) {
        trades=tradesHistory.trades;
        XXBTZEUR = getCostPrice('XXBTZEUR', trades);
        BCHEUR = getCostPrice('BCHEUR', trades);
        XDGEUR = getCostPrice('XDGEUR', trades);
        XXLMZEUR = getCostPrice('XXLMZEUR', trades);
    }

    //let trades=tradesHistory.trades;
    console.log('tradesHistory', tradesHistory);

    return (
        <div className='TradesHistory'>
        <span onClick={props.onClick}>resfresh</span>
        {tradesHistoryIsNull ? (
            <>...</>
        ) : (
            <>
            <div className='TradesHistory-Count'>
                {tradesHistory.count} trades found
            </div>
            Average buying cost of BTC = {XXBTZEUR.costPrice}<div className='sell' onClick={() => props.onSell('BTZ', 'BTZEUR', XXBTZEUR.costPrice*1.05, XXBTZEUR.volume)}>sell +5% ({XXBTZEUR.costPrice*1.05})</div><br/>
            Average buying cost of BCH = {BCHEUR.costPrice}<div className='sell' onClick={() => props.onSell('BCH', 'BCHEUR', BCHEUR.costPrice*1.05, BCHEUR.volume)}>sell +5% ({BCHEUR.costPrice*1.05})</div><br/>
            Average buying cost of XDG = {XDGEUR.costPrice}<div className='sell' onClick={() => props.onSell('XDG', 'XDGEUR', XDGEUR.costPrice*1.05, XDGEUR.volume)}>sell +5% ({XDGEUR.costPrice*1.05})</div><br/>
            Average buying cost of XLM = {XXLMZEUR.costPrice}<div className='sell' onClick={() => props.onSell('XXLM', 'XXLMZEUR', XXLMZEUR.costPrice*1.05, XXLMZEUR.volume)}>sell +5% ({XXLMZEUR.costPrice*1.05})</div><br/>
            {   /*
                Object.keys(trades).map((key, i) => (
                    <div key={i}>
                        [{trades[key].type}] 
                        {pairs[trades[key].pair]} : 
                        {trades[key].vol} at {trades[key].price} for {trades[key].cost}
                    </div>
                ))*/

            }
            </>
        )}
        </div>
    )
}


export default TradesHistory;