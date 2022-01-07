import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');
const STORAGE_DICTIONARY = {
  token: 'token',
  city: 'city',
}

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

const getKeyValue = async (key) => {
  if(await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

const getData = async () => {
  const isFileExist = await isExist(filePath);
  if(isFileExist) {
    const file = await promises.readFile(filePath);
    return JSON.parse(file);
  } else {
    return {};
  }
}

const saveKeyValue = async (key, value) => {
  const data = await getData();
  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
}

export { saveKeyValue, getKeyValue, STORAGE_DICTIONARY };