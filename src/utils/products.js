export const normalizeProducts = data => {
  const negocios = Object.keys(data);
  const productos = [];

  if (negocios.length) {
    negocios.forEach( negocio => {
      const productosKeys = Object.keys( data[negocio] );

      productosKeys.forEach( producto => {
        productos.push( data[negocio][producto] );
      });
    });
  }

  return productos;
};