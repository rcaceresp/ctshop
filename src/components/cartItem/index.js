import React from 'react';

const CartItem = props => {
  const {name, images, desc, hasOffer, oferta = null, price, stock, _id:productID } = props.data.product;
  const {company, _id:companyID} = props.data.vendor;
  const {qty} = props.data;
  return(
    <React.Fragment>
      <div className="row">
        <div className="columns">
          <div className="column is-one-fifth">
            <img src={images[0]} alt={name} className="cart-item-img"/>
          </div>
          <div className="column">
            <h2 className="title is-4 has-text-weight-bold"><a className="product-title" href={`/${companyID}/${productID}`}>{name}</a></h2>
            <p className="has-text-black">{desc}</p>
          </div>
          <div className="column">
            {price}
            QTY: {qty}
          </div>
        </div>
      </div>
      <hr/>
    </React.Fragment>
  );
};

export default CartItem;