//Kraken.js

import axios from 'axios';
import crypt from 'crypto';
import qs from 'qs';

const config = require('./kraken-config');
class Kraken {
    // Create a signature for a request
    // path : the URI Path to used (eg. /0/private/Balance)
    // request : the params of the request (eg. nonce=0123456789012)
    // secret : the encoded64 secret private key
    // nonce : the nonce value in miliseconde. Should be the same than in request
    getMessageSignature = (path, request, secret, nonce) => {
        const message       = qs.stringify(request);
        const secret_buffer = new Buffer.from(secret, 'base64');
        const hash          = new crypt.createHash('sha256');
        const hmac          = new crypt.createHmac('sha512', secret_buffer);
        const hash_digest   = hash.update(nonce + message).digest('binary');
        
    	return hmac.update(path + hash_digest, 'binary').digest('base64'); //hmac_digest;
    };

    // Get Ticker from public Kraken API
    // pair : <the name of searched pair>
    getTicker = async(pair) => {
        return(axios.get(config.url + config.public.tickerURI + '?pair=' + pair));
    }

    // pair = asset pair to get OHLC data for
    // interval = time frame interval in minutes (optional):
	// 1 (default), 5, 15, 30, 60, 240, 1440, 10080, 21600
    // since = return committed OHLC data since given id (optional.  exclusive)
    getOHLC = async(pair, interval, since) => {
        const paramInterval = (interval === null)?'':('&interval='+interval);
        const paramSince = (since === null)?'':('&since='+since);
        // TODO: Check why we need to put localhost URL and refactor to avoid this localhost URL in hard.
        const url = 'http://localhost:3000';

        return(axios.get(url + config.public.OHLC_URI + '?pair=' + pair ));
    }
    
    getBalance = async() => {
        const api_path = config.private.balanceURI;
        const private_key = config.private_key;
        const public_key = config.public_key;

        const api_nonce = new Date() * 1000; // spoof microsecond

        var params = {
            'nonce': api_nonce,
        };

        var api_signature = this.getMessageSignature(api_path, params, private_key, api_nonce);

        const url = 'http://localhost:3000' + api_path;

        const options = {
            method: 'POST',
            headers: { 
                'content-type': 'application/x-www-form-urlencoded',
                'API-Key'  : public_key,
                'API-Sign' : api_signature,
            },
            data: qs.stringify(params),
            url,
          };

        const resp = await axios(options);
        console.log(resp);
        return resp;
    }

    getTradesHistory = async() => {
        const api_path = config.private.tradesHistoryURI;
        const private_key = config.private_key;
        const public_key = config.public_key;

        const api_nonce = new Date() * 1000; // spoof microsecond
        
        var params = {
            'nonce' : api_nonce,
        };

        var api_signature = this.getMessageSignature(api_path, params, private_key, api_nonce);

        const url = 'http://localhost:3000' + api_path;

        const options = {
            method: 'POST',
            headers: { 
                'content-type': 'application/x-www-form-urlencoded',
                'API-Key'  : public_key,
                'API-Sign' : api_signature,
            },
            data: qs.stringify(params),
            url,
          };

        const resp = await axios(options);
        console.log(resp);
        return resp;
    }

    addOrder = async(pair, type, orderType, price, volume) => {
        const api_path = config.private.addOrderURI;
        const private_key = config.private_key;
        const public_key = config.public_key;

        const api_nonce = new Date() * 1000; // spoof microsecond
        
        var params = {
            'nonce' : api_nonce,
            'pair' : pair,
            'type' : type,
            'ordertype' : orderType,
            'price' : price,
            'volume' : volume,
        };

        params.nonce = api_nonce; 

        var api_signature = this.getMessageSignature(api_path, params, private_key, api_nonce);

        const url = 'http://localhost:3000' + api_path;

        const options = {
            method: 'POST',
            headers: { 
                'content-type': 'application/x-www-form-urlencoded',
                'API-Key'  : public_key,
                'API-Sign' : api_signature,
            },
            data: qs.stringify(params),
            url,
          };

        const resp = await axios(options);
        console.log(resp);
        return resp;
    }
}

const assets = {
        'ZEUR' : 'Euro',
        'XXBT' : 'Bitcoin',
        'XXDG' : 'Doge',
        'XXLM' : 'Stellar Lumens',
        'BCH' : 'Bitcoin Cash'
}

const pairs = {
    'XXBTZEUR' : 'BTC / EUR',
    'XXLMZEUR' : 'XLM / EUR',
    'XDGEUR'   : 'DOG / EUR',
    'BCHEUR'   : 'BCH / EUR',
}

const EURpairs = {
    'XXBT' : 'XBTEUR',
    'XXLM' : 'XLMEUR',
    'XXDG'   : 'XDGEUR',
    'BCH'   : 'BCHEUR',
}

const ALTpairs = {
    'XBTEUR' : 'XXBTZEUR',
    'XLMEUR' : 'XXLMZEUR',
    'XDGEUR' : 'XDGEUR',
    'BCHEUR' : 'BCHEUR',
}

export {Kraken as default, assets, pairs, EURpairs, ALTpairs};