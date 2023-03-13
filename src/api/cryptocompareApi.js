import { makeRequest } from './server.js';

const API_KEY =
  "c444bd26c3cbaceb0e3f25e96f7dda415e39afc9227c15a87f271d84152e203f";

const cryptoCurencys = 'BTC,ETH,BNB,XRP';
const fiatCyrencys = 'USD,EUR,UAH,GBP';

export const  getCyrency = async () => {
     let data = await makeRequest(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${cryptoCurencys}&tsyms=${fiatCyrencys}&api_key=${API_KEY}`);

    return data;
}

export const getCryptoCurencys = () =>{
  return cryptoCurencys.split(',');
}

export const getFiatCyrencys = () => {
  return fiatCyrencys.split(',');
}