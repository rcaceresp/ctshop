import React from 'react';
import ProductPrice from '../../components/productPrice';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  const { name, price, images, descuento: oferta = null, negocio, _id, vendedorName= ''  } = props.product;

  return(
    <div className="column is-two-fifth-mobile is-one-quarter-tablet is-one-fifth-widescreen">
      <div className="card product-card">
        <div className="card-image">
          <figure className="image is-4by3 product-figure">
            <Link to={`/producto/${negocio}/${_id}`}><img src={images[0]} alt="Catrachos Shop" /></Link>
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <h5 className="product-title title is-6 has-text-weight-bold"><Link to={`/producto/${negocio}/${_id}`} className="has-text-black">{name}</Link>
              <br/><span className="tag is-small is-light">Vendido Por: {vendedorName}</span>
            </h5>
            <hr/>
            <ProductPrice price={price} discount={ oferta ? oferta.porcentaje : null } isCard={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;