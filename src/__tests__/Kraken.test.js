// Kraken.test.js

import Kraken, {ALTpairs } from '../components/Kraken';
const kraken = new Kraken();

const path='/0/private/Balance';
const request={
    "nonce": 1617799787666000
}
const secret= 'secret';
const nonce=1617799787666000;

it("Validate getMessageSignature = (path, request, secret, nonce)", () => {
    expect(
        kraken.getMessageSignature(path, request, secret, nonce)
    ).toBe('l520RUHN+k9lBoT2oJD9Ysrn06Iwv+ifzXib6M7XQBWQYSCSOw1emYzCLsu8IqtghN8kRjvpD5Qp2alIJ5cA/Q==');
});