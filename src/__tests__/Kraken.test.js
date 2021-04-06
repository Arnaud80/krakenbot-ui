// Kraken.test.js

import Kraken, {ALTpairs } from '../components/Kraken';
const kraken = new Kraken();

describe("Ticker API Call", () => {
    test("Simple call", () => {
        const pair='XBTEUR';
        const APIreturn = (() => kraken.getTicker(pair));

        expect(APIreturn.error[0]).toEqual(ALTpairs['XBTEUR']);
    });
});
