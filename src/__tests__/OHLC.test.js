// OHLC.test.js

import {dataOHLCtoDataChart} from '../components/ohlcUtils';
import {ohlcAPIreturnSimple, ohlcDataChartSimple} from '../__mock__/OHLC.mock'
it("Validate dataOHLCtoDataChart function", () => {
    
    expect(
      dataOHLCtoDataChart(ohlcAPIreturnSimple.result.XXBTZEUR)
    ).toStrictEqual(ohlcDataChartSimple);
});
