import React from 'react';
import {formatMoney, priceWithDiscount} from '../../utils/products';

const ProductPrice = props => {
  const { price = null, discount = null, isCard = false} = props;
  const calculatedPrice = priceWithDiscount( price, discount );
  const size = isCard ? 5 : 3;
  
  return (
    <p className={`has-text-weight-bold has-text-centered has-text-black-bis title is-${size}`}>
      {calculatedPrice.discountedPrice !== calculatedPrice.original && <>
        <span className="tag has-strike-text is-danger is-light">
          L {formatMoney(calculatedPrice.original)}
        </span><br/>
      </>}
      {calculatedPrice.discountedPrice === calculatedPrice.original && isCard && <React.Fragment><span className="tag is-light">Precio</span><br/></React.Fragment>}
    <small>L. </small>{formatMoney(calculatedPrice.discountedPrice)}
    </p>
  );
};

export default ProductPrice;

