import React from 'react';
import { render } from '@testing-library/react';
import Ticker from '../components/Ticker';

describe('<Ticker ticker={ticker}/>', () => {
    let getByTestId;
    const ticker = {
        "pair": "XBTEUR",
        "data": {
            "a": [
                "50450.00000",
                "1",
                "1.000"
            ],
            "b": [
                "50449.90000",
                "3",
                "3.000"
            ],
            "c": [
                "50449.60000",
                "0.22504034"
            ],
            "v": [
                "2296.49668096",
                "2984.57837008"
            ],
            "p": [
                "50536.89526",
                "50386.11714"
            ],
            "t": [
                24676,
                40099
            ],
            "l": [
                "49700.00000",
                "49331.90000"
            ],
            "h": [
                "50960.00000",
                "50960.00000"
            ],
            "o": "49878.10000"
        },
        "lastData": {
            "a": [
                "50450.00000",
                "1",
                "1.000"
            ],
            "b": [
                "50449.90000",
                "4",
                "4.000"
            ],
            "c": [
                "50449.60000",
                "0.22504034"
            ],
            "v": [
                "2296.49668096",
                "2984.85327428"
            ],
            "p": [
                "50536.89526",
                "50386.09089"
            ],
            "t": [
                24676,
                40109
            ],
            "l": [
                "49700.00000",
                "49331.90000"
            ],
            "h": [
                "50960.00000",
                "50960.00000"
            ],
            "o": "49878.10000"
        },
        "lastTradeStatus": "lower"
    }

    describe('render the Ticker component', () => {
        ({ getByTestId } = render(<Ticker ticker={ticker}/>));

        it('check Ticker displayed is correctly displayed', () => {
            expect(getByTestId('ticker')).toHaveTextContent(/^Last trade for XBTEUR = 50449.60000$/);
        });
    });
});
