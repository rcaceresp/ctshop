import crypto from 'crypto-js';
// import { formatMoney } from './products';

const internals = {
  appKey: 'C@Tr@c0sSh0p--Rul3z4eVa'
};

export const setToLocalStorage = (key = '_cart', data = null, callback = null) => {
  let edata = false;

  try {
    if (!key) {
      console.log('{setToLocalStorage}: a key must be specified.');

      return null;
    }

    if (!data) {
      console.log('{setToLocalStorage}: data to save must be provided.');

      return null;
    }

    edata = crypto.AES.encrypt( JSON.stringify(data), internals.appKey).toString();

    localStorage.setItem(key, edata);

    if (callback) callback();
  } catch(e) {
    console.log(e.message);

    return null;
  }
};

export const getFromLocalStorage = (key = '_cart') => {
  try {
    if (!key) {
      console.log('{getFromLocalStorage}: a key must be specified.');

      return null;
    }

    if (!localStorage[key]) {
      console.log(`{getFromLocalStorage}: specified key {${key}} does not exists in localStorage`);

      return {};
    }

    const _dataByte = crypto.AES.decrypt(localStorage[key], internals.appKey);
    const ecryptedData = JSON.parse(_dataByte.toString(crypto.enc.Utf8));

    return ecryptedData;
  } catch(e) {
    console.log(e.message);

    return null;
  }
};

export const getCartWithData = async (fb) => {
  try {
    const _cart = await getFromLocalStorage();
    const vendors = Object.keys(_cart);
    const products = [];

    await Promise.all( vendors.map( async vendor => {
      const vendorFetch = await fb.db.ref(`/companies/${vendor}`).once('value');
      const vendorData = vendorFetch.val();
      const item = {};

      item.vendor = {
        _id: vendor,
        name: vendorData.company
      };

      await Promise.all( _cart[vendor].map( async product => {
        const productFetch = await fb.db.ref(`/products/${vendor}/${product._id}`).once('value');
        const productData = productFetch.val();

        products.push({ vendor: {...item.vendor}, product: {_id:product._id, ...productData}, qty: product.qty })

      })).then( () => console.log(`All products Fetched for company ${item.vendor.name}`));
    })).then( () => console.log('All data fetched'));

    return products;
  } catch(e) {
    console.log(e.message);

    return [];
  }
};