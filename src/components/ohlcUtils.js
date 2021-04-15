// ohlcUtils.js

export const dataOHLCtoDataChart = (ohlcData) => {
    let result=[];

    for(let i=0; i<ohlcData.length; i++) {
        result[i]={
            date: new Date(ohlcData[i][0] * 1000).toLocaleString("en-US"),
            open: parseFloat(ohlcData[i][1]),
            high: parseFloat(ohlcData[i][2]),
            low: parseFloat(ohlcData[i][3]),
            close: parseFloat(ohlcData[i][4]),
            volume: parseFloat(ohlcData[i][6])
        }
    }
    return(result);
 }