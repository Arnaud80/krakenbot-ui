// Kraken.test.js

import kraken from '../components/Kraken';
import axios from 'axios';

jest.mock('axios');

const path='/0/private/Balance';
const request={
    "nonce": 1617799787666000
}
const secret= 'secret';
const nonce=1617799787666000;

describe('Kraken tests', () => {
    test('getMessageSignature', async () => {
        expect(
            kraken.getMessageSignature(path, request, secret, nonce)
        ).toBe('l520RUHN+k9lBoT2oJD9Ysrn06Iwv+ifzXib6M7XQBWQYSCSOw1emYzCLsu8IqtghN8kRjvpD5Qp2alIJ5cA/Q==');
    });

    test('getTicker', async () => {
        axios.get.mockImplementationOnce((url) =>
            Promise.resolve(url)
        );

        expect(
            await kraken.getTicker('test')
        ).toBe('https://api.kraken.com/0/public/Ticker?pair=test');
    });

    test('getBalance', async () => {
        axios.mockImplementationOnce((options) =>
            Promise.resolve(options.url)
        );

        expect(
            await kraken.getBalance()
        ).toBe('http://localhost:3000/0/private/Balance');
    });

    test('getOHLC', async () => {
        axios.get.mockImplementation((url) =>
            Promise.resolve(url)
        );

        expect(
            await kraken.getOHLC('XBTEUR', 1, 1234567890)
        ).toBe('http://localhost:3000/0/public/OHLC?pair=XBTEUR&interval=1&since=1234567890');

        expect(
            await kraken.getOHLC('XBTEUR', 1, null)
        ).toBe('http://localhost:3000/0/public/OHLC?pair=XBTEUR&interval=1');
        
        expect(
            await kraken.getOHLC('XBTEUR', null, null)
        ).toBe('http://localhost:3000/0/public/OHLC?pair=XBTEUR');
    })

    test('getTradesHistory', async () => {
        axios.mockImplementationOnce((options) =>
            Promise.resolve(options.url)
        );

        expect(
            await kraken.getTradesHistory()
        ).toBe('http://localhost:3000/0/private/TradesHistory');
    });

    test('addOrder', async () => {
        axios.mockImplementationOnce((options) =>
            Promise.resolve(options.url)
        );

        expect(
            await kraken.addOrder()
        ).toBe('http://localhost:3000/0/private/AddOrder');
    });
});