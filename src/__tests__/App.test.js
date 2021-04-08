// __tests__/App.test.js
import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App.js';
import {apiReturnTicker} from '../__mocks__/Tickers.mock'
import {apiReturnBalance, apiReturnTradesHistory} from '../__mocks__/Balance.mock'
import {apiReturnOHCL} from '../__mocks__/OHLC.mock';
import kraken, { ALTpairs } from '../components/Kraken';
import 'jest-canvas-mock';

jest.mock('../components/Kraken');

describe('App', () => {
    test('renders App component', async () => {
        // Mock the Kraken functions
        kraken.getTicker.mockImplementation((pair) =>
            Promise.resolve({ data: apiReturnTicker[ALTpairs[pair]]})
        );

        kraken.getBalance.mockImplementation(() =>
            Promise.resolve({ data: apiReturnBalance})
        );

        kraken.getTradesHistory.mockImplementation(() =>
            Promise.resolve({ data: apiReturnTradesHistory})
        );

        kraken.getOHLC.mockImplementation(() =>
            Promise.resolve({ data: apiReturnOHCL})
        );

        render(<App />);

        let ticker=null;
        let totalBalance=null;
        
        await waitFor(() => expect(kraken.getTicker).toBeCalled());
        await waitFor(() => expect(kraken.getBalance).toBeCalled());
        await waitFor(() => expect(kraken.getTradesHistory).toBeCalled());
        await waitFor(() => expect(kraken.getOHLC).toBeCalled());

        ticker = screen.queryByTestId('ticker').textContent;
        expect(ticker).toBe('Last trade for XBTEUR = 999999.99999');

        
        totalBalance = screen.queryByTestId('totalBalance').textContent;
        expect(totalBalance).toBe('104.2435377138 Euros');

        // debug
        screen.debug();
    });
});