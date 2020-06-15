import React from 'react';
import { setToLocalStorage, getFromLocalStorage} from '../../utils/cart';
import _array from 'lodash/array';

class AddToCartBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state ={};

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(vendor, product, qty) {
    const _cart = getFromLocalStorage();

    _cart[vendor._id] = _cart[vendor._id] ? _cart[vendor._id] : [];

    console.log(_cart[vendor._id].length);

    if (_cart[vendor._id].length === 0) {
      
      _cart[vendor._id].push({ _id: product._id, qty });
    } else {
      const existsInCartIndex = _array.findIndex(_cart[vendor._id], item => item._id === product._id);

      if (existsInCartIndex !== -1) {
        _cart[vendor._id][existsInCartIndex].qty = qty;
      } else {
        _cart[vendor._id].push({ _id: product._id, qty });
      }
    }

    setToLocalStorage('_cart', _cart, () => window.location = '/carrito');
  }

  render() {
    const {vendor, product, qty, stock} = this.props;
    const isOutOfStock = Number(stock) === 0 || product.outStock === true;

    return(
      <React.Fragment>
        {isOutOfStock && <p className="has-text-centered has-text-danger"><b>Agotado</b></p>}
        <div className="buttons is-centered">
          <button className="button is-danger is-small has-text-weight-bold" onClick={e => this.addToCart(vendor, product, qty, stock)} disabled={isOutOfStock}>
            <span className="icon"><i className="fa fa-cart-plus"/></span> <span>Agregar al Carrito</span>
          </button>
        </div>
      </React.Fragment>
      
    );
  }
}

export default AddToCartBtn;