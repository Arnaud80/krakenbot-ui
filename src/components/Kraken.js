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
        const hmac_digest   = hmac.update(path + hash_digest, 'binary').digest('base64');

    	return hmac_digest;
    };

    // Get Ticker from public Kraken API
    // pair : <the name of searched pair>
    getTicker = async(pair) => {
        const resp = await axios.get(config.url + config.public.tickerURI + '?pair=' + pair);
        return resp;
    }
    
    getBalance = async() => {
        const api_path = config.private.balanceURI;
        const private_key = config.private_key;
        const public_key = config.public_key;

        const api_nonce = new Date() * 1000; // spoof microsecond
        var api_post = {
            'nonce': api_nonce,
        }
        var params = {};

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
            data: qs.stringify(api_post),
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
}

/*
const test_dataTicker={
  "error":[],
  "result":
      {"XXBTZEUR":
          {"a":["33543.80000","1","1.000"],"b":["33543.20000","1","1.000"],"c":["33549.70000","0.09198674"],"v":["5600.11958776","6314.01816805"],"p":["33029.21759","32838.72615"],"t":[63739,76707],"l":["31719.40000","31009.20000"],"h":["34007.80000","34007.80000"],"o":"31809.60000"}
      }
}
*/

export {Kraken as default, assets};