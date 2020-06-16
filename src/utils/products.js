export const normalizeProducts = data => {
  const negocios = Object.keys(data);
  const productos = [];

  if (negocios.length) {
    negocios.forEach( negocio => {
      const productosKeys = Object.keys( data[negocio] );

      productosKeys.forEach( producto => {

        data[negocio][producto]['price'] = Number(data[negocio][producto]['price']);
        const product = {_id: producto,...data[negocio][producto], negocio};

        productos.push( product );
      });
    });
  }

  return productos;
};

export const priceWithDiscount = (price = 0, discount = null) => {

  return {
    original: Number(price),
    discountedPrice: discount ? (Number(price) - ( Number(price) * (Number(discount) / 100 ))) : Number(price)
  };
};

export const formatMoney = (num) => Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
