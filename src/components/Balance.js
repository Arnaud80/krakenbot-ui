import React from 'react';
import { assets } from './Kraken';

const Balance = props => {
    const balance=props.balance;

    const balanceIsNull = balance === null;
    console.log('Balance', balance);

    return (
        <div className='Balance' onClick={props.onClick}>
        {balanceIsNull ? (
            <>...</>
        ) : (
            <>
            {   // Loop on returned assets
                Object.keys(balance).map((key, i) => (
                    <div key={i}>{assets[key]} = {balance[key]}</div>
                ))
            }
            </>
        )}
        </div>
    )
}


export default Balance;