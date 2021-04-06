import React from 'react';
import { ALTpairs } from './Kraken';
import { Table } from 'react-bootstrap';

// This function return an object whom contain
// - 'unitCostPrice' :The calcuation of the UCP (Unit Cost Price)
// - 'volume' : The Total Buying Volume
// - 'Trades' : Array of buying corresponding trades
// - 'count' : The number of corresponding trades
const getUnitCostPriceInfo = (trades, pair, currentBalance) => {
    let unitCostPrice=0.0;
    let vol=0.0;
    let totalBuyVol=0.0;
    let totalBuyCost=0.0;

    const tradesArray=Object.keys(trades);
    let pairTrades=[];
    let count=0;
    
    tradesArray.forEach(trade => {
        
        if(trades[trade].pair===pair) {
            vol = vol + parseFloat(trades[trade].vol) * (trades[trade].type==='buy'?1:-1);
            if(trades[trade].type==='buy') {
                totalBuyVol = totalBuyVol + parseFloat(trades[trade].vol);
                totalBuyCost = totalBuyCost + parseFloat(trades[trade].price) * parseFloat(trades[trade].vol)  + parseFloat(trades[trade].fee);
                unitCostPrice = totalBuyCost / totalBuyVol;
            }

            pairTrades[trade]={
                'time':trades[trade].time,
                'type':trades[trade].type,
                'price':trades[trade].price,
                'volume':trades[trade].vol,
                'fee':trades[trade].fee,
                'cost':trades[trade].cost,
            };
            count++;
        }
    });

    return({'unitCostPrice' : unitCostPrice, 'volume' : totalBuyVol, 'Trades': pairTrades, 'count': count});
    //return({'unitCostPrice' : 1, 'volume' : 1, 'Trades': 'XBTEUR', 'count': 1});
}

const LogTrades = props => {
    const logTrades = props.trades;

    return (
        <Table striped bordered hover size="sm" variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Volume</th>
                    <th>Fee</th>
                    <th>Cost</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(logTrades).map((key, i) => (
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{key}</td>
                            <td>{new Date(logTrades[key].time * 1000).toLocaleString()}</td>
                            <td>{logTrades[key].type}</td>
                            <td>{logTrades[key].price}</td>
                            <td>{logTrades[key].volume}</td>
                            <td>{logTrades[key].fee}</td>
                            <td>{logTrades[key].cost}</td>
                        </tr>
                    ))
                }  
            </tbody>
        </Table>
    )
}

const TradesHistory = props => {
    const tradesHistory=props.tradesHistory;
    const tradesHistoryIsNull = tradesHistory === null;
    const currentPair = props.currentPair;
    const currentBalance = props.currentBalance;

    let UCPinfo=null;

    if(!tradesHistoryIsNull) {
        UCPinfo = getUnitCostPriceInfo(tradesHistory.trades, ALTpairs[currentPair], currentBalance);
    }

    return (
        <div className='TradesHistory'>
            {tradesHistoryIsNull ? (
                <>...</>
            ) : (
                <>
                    <div className='TradesHistory-Count'>
                        {UCPinfo.count} trade(s) found<br/>
                        Unit Cost Price = {UCPinfo.unitCostPrice}
                    </div>
                    <LogTrades trades={UCPinfo.Trades}/>
                </>
            )}
        </div>
    )
}

export default TradesHistory;