import crypto from 'crypto-js';
import {setToLocalStorage} from './cart';


const internals = {
  appKey: 'C@Tr@c0sSh0p--Rul3z4eVa'
};

 const getFromLocalStorage = (key = null) => {

  try {
    if (!key) {
      console.log('{getFromLocalStorage}: a key must be specified.');

      return null;
    }

    if (!localStorage[key]) {
      console.log(`{getFromLocalStorage}: specified key {${key}} does not exists in localStorage`);

      return null;
    }

    const _dataByte = crypto.AES.decrypt(localStorage[key], internals.appKey);
    const ecryptedData = JSON.parse(_dataByte.toString(crypto.enc.Utf8));

    return ecryptedData;
  } catch(e) {
    console.log(e.message);

    return null;
  }
};

export const getQuery = () => {
  const query = getFromLocalStorage('_app_d');

  if (!query) {
    setToLocalStorage('_app_d', {
      queryString: '',
      category: 'ropa'
    });
  }

  return getFromLocalStorage('_app_d');
};