import React from 'react';
import ProductPrice from '../productPrice';

const CartItem = props => {
  const {name, images, desc, hasOffer, oferta = null, price, stock, _id:productID } = props.data.product;
  const {name:companyName, _id:companyID} = props.data.vendor;
  const {qty} = props.data;

  return(
    <React.Fragment>
      <div className="row">
        <div className="columns">
          <div className="column is-one-fifth">
            <img src={images[0]} alt={name} className="cart-item-img"/>
          </div>
          <div className="column">
            <a href="" className="has-text-black"><small>Vendido por: <div className="tag is-light"><b>{companyName}</b></div></small></a>
            <p className="title is-4 has-text-weight-bold has-text-link-dark"><a className="has-text-link-dark " href={`/producto/${companyID}/${productID}`}>{name}</a> <br/><span className="tag has-text-weight-bold is-light is-warning">Cantidad: {qty}</span></p>
          </div>
          <div className="column">
            <ProductPrice price={price} discount={ oferta ? oferta.porcentaje : null } isCard={true} />
            <div className="buttons is-centered">
              <button className="button is-danger is-small "><span className="icon"><i className="fa fa-trash"/></span> <span>Remover</span></button>
            </div>
          </div>
        </div>
      </div>
      <hr/>
    </React.Fragment>
  );
};

export default CartItem;