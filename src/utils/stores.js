export const normalizeStores = data => {
  const negocios = Object.keys(data);
  const negociosData = [];

  if (negocios.length) {
    negocios.forEach( negocio => {
      data[negocio]['_id'] = negocio;
      negociosData.push(data[negocio]);
    });
  }

  return negociosData;
};