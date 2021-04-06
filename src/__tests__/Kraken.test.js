// Kraken.test.js

import Kraken, {ALTpairs } from '../components/Kraken';
const kraken = new Kraken();

it("Validate ALTpairs const", () => {
    expect(
      ALTpairs['XBTEUR']
    ).toBe('XXBTZEUR');
});