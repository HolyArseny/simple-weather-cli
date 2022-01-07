import https from 'https';
import { URL } from 'url';
import { getKeyValue, STORAGE_DICTIONARY } from './storage.service.js';

const createURL = ({url, city, apiToken, units}) => {
  const createdURL = new URL(url);
  createdURL.searchParams.append('q', city);
  createdURL.searchParams.append('appid', apiToken);
  createdURL.searchParams.append('units', units);
  return createdURL;
}

const getWeather = (city) => {
  return new Promise(async (resolve, reject) => {
    const { token, city: savedCity } = STORAGE_DICTIONARY;
    if(!token) throw new Error('Api token required');

    const apiToken = await getKeyValue(token);
    const activeCity = await getKeyValue(savedCity);
    const url = createURL({
      url: 'https://api.openweathermap.org/data/2.5/weather',
      city: city || activeCity,
      apiToken,
      units: 'metric',
    });

    let res = '';

    https.get(url, (response) => {
      response.on('data', (chunk) => {
        res += chunk;
      });
      response.on('end', () => {
        res = JSON.parse(res);
        resolve(res);
      });
      response.on('error', (error) => {
        console.error(error);
        reject();
      })
    });
  });
};

export { getWeather };