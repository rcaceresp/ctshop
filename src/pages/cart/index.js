import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import { getCartWithData } from '../../utils/cart';
import Loader from '../../components/loader/bversion';
import CartItem from '../../components/cartItem';
import {formatMoney, priceWithDiscount} from '../../utils/products';

const internals = {
  products: [],
  carEmptyMessage: 'El carrito esta vacio',
  erroOcurred: false,
  totalItems: 0,
  totalPrice: 0,
  Shipping: 0
}

class CartPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount(){
    try {
      let _cart = await getCartWithData(this.props.firebase);

      if (_cart.length) {
        _cart = _cart.map( item => {
          const offer = item.product.oferta? item.product.oferta.porcentaje : null;
          const discountedPrice = priceWithDiscount(item.product.price, offer);

          item['discountedPrice'] = discountedPrice;
          internals.totalItems = internals.totalItems + item.qty;
          internals.totalPrice = internals.totalPrice + (discountedPrice.discountedPrice * item.qty);

          return item;
        });
      }

      internals.products = _cart;
      this.setState({ isLoading: false });
    } catch(e) {
      console.log(e.message)
      internals.erroOcurred = true;
      this.setState({ isLoading: false });
    }
  }

  render() {
    return(
      <React.Fragment>
        <section className="section">
          <div className="container">
            {this.state.isLoading && <Loader />}
            {!this.state.isLoading && internals.erroOcurred && <p>Ooops! Un error ha ocurrido.</p>}
            <div className="row">
              <h2 className="title is-3 has-text-black">Tu Carrito</h2>
              <hr/>
              {!this.state.isLoading && internals.products.length === 0 && <p>Carrito Vacio</p>}
              <div className="columns is-centered">
                <div className="column is-two-thirds">
                  {!this.state.isLoading &&
                    !internals.erroOcurred &&
                    internals.products.map( item => <CartItem key={`cartItem-${item.product.id}`} data={item}/>)
                  }
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <h3 className="title is-4 has-text-centered">Resumen de la Orden:</h3>
                      <hr/>
                      <p className="has-text-centered has-text-weight-bold">Total Items: {internals.totalItems}</p>
                      <h3 className="title is-3 has-text-centered has-text-danger">L. {formatMoney(internals.totalPrice)}</h3>
                      <hr/>
                      <div className="buttons is-centered">
                        {!this.state.isLoading && internals.products.length > 0 &&<button className="button is-danger">Ordernar</button>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const CartPage = withFirebase(CartPageBase);

export default CartPage;



