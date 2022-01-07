import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js';
import { saveKeyValue, STORAGE_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
  const { token: key } = STORAGE_DICTIONARY;
  const isTokenLength = token.length;
  if(!isTokenLength) {
    printError('Token is required!');
    return;
  }
  try {
    await saveKeyValue(key, token);
    printSuccess('Token saved successfuly');
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  const { city: key } = STORAGE_DICTIONARY;
  const isCityLength = city.length;
  if(!isCityLength) {
    printError('City is required');
    return;
  }
  const isValidCity = await checkValidCity(city);
  if(!isValidCity) {
    printError('Wrong city');
    return;
  }
  try {
    await saveKeyValue(key, city);
    printSuccess('City saved successfuly');
  } catch (error) {
    printError(error.message);
  }
};

const checkValidCity = async (city) => {
  const response = await getWeather(city);
  const { cod } = response;
  return cod === 200;
};

const getForcast = async () => {
  try {
    const weather = await getWeather();
    if(weather.cod !== 200) {
      printError(weather.message);
      return;
    }
    return weather;
  } catch (error) {
    printError(error.message);
  }
}

const main = async () => {
  const { h, c, t } = getArgs();

  if(h) {
    printHelp();
    return;
  }
  if(c) {
    saveCity(c)
    if(!t) return;
  };
  if(t) {
    saveToken(t);
    return;
  };

  const weather = await getForcast();
  printWeather(weather);
};

main();
