const config = require('./kraken-config');

class Kraken {
    fetchTicker(callBack) {
        async() => {
            const tickerURL = config.url + config.public.tickerURI;

            const resp = await fetch(tickerURL);
            const data = await resp.json();
            callBack(data.result);
        }

        /*fetch(tickerURL) // Call API function to retreive last game
        .then(results => {
                return results.json(); // Transform the data into json
            })
        .then(data => {
                console.log('ICI :' + data.result);
                callBack(data.result);
            })
        .catch(error => {
            console.log('There is a problem with fetch operation : ' + error.message);
        })*/

        //return ticker;
    
    }
}

export default Kraken;