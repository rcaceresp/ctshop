import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import { getCartWithData, setToLocalStorage } from '../../utils/cart';
import Loader from '../../components/loader/bversion';
import CartItem from '../../components/cartItem';
import {formatMoney, priceWithDiscount} from '../../utils/products';

const internals = {
  products: [],
  carEmptyMessage: 'El carrito esta vacio',
  erroOcurred: false,
  totalItems: 0,
  totalPrice: 0,
  shipping: 0,
  oc: {}
}

class CartPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shipping: 0
    };

    this.changeDelivery = this.changeDelivery.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }

  async componentDidMount(){
    try {
      let {products: _cart, shipping = 0, originalCart} = await getCartWithData(this.props.firebase);

      if (_cart.length) {
        _cart = _cart.map( item => {
          const offer = item.product.descuento ? item.product.descuento.porcentaje : null;
          const discountedPrice = priceWithDiscount(item.product.price, offer);

          item['discountedPrice'] = discountedPrice;
          internals.totalItems = internals.totalItems + item.qty;
          internals.totalPrice = internals.totalPrice + (discountedPrice.discountedPrice * item.qty);

          return item;
        });
      }

      internals.products = _cart;
      internals.shipping = shipping;
      internals.oc = originalCart;

      console.log(internals);

      this.setState({ isLoading: false, shipping });
    } catch(e) {
      
      console.log(e.message)
      
      internals.erroOcurred = true;
      this.setState({ isLoading: false });
    }
  }

  deleteFromCart({companyID = null, productID = null}) {

    if (!companyID || !productID) {
      
      return;
    }
    
    internals.oc['cart'][companyID] = internals.oc['cart'][companyID].filter( item => item._id !== productID);

    if (internals.oc['cart'][companyID].length === 0) delete internals.oc['cart'][companyID];

    setToLocalStorage('_cart', { ...internals.oc }, _ => window.location = '/carrito');

  }

  changeDelivery(code = 'dom') {
    const shipping = code !== 'dom' ? 0 : internals.shipping;

    this.setState({ shipping });
  }

  render() {
    return(
      <>
        <section className="section">
          <div className="container">
            {this.state.isLoading && <Loader />}
            {!this.state.isLoading && internals.erroOcurred && <p className="title is-4 has-text-centered">Ooops! Un error ha ocurrido.</p>}
            <div className="row">
              <h2 className="title is-3 has-text-black">Tu Carrito</h2>
              <hr/> 
              {!this.state.isLoading && internals.products.length === 0 && <><p className="title is-4 has-text-centered">Carrito Vacio</p><div className="buttons is-centered"><a href="/" className="button is-danger is-rounded is-small">Volver al inicio</a></div></>}
              {!this.state.isLoading && internals.products.length > 0 && <div className="columns is-centered">
                <div className="column is-two-thirds">
                  {!this.state.isLoading &&
                    !internals.erroOcurred &&
                    internals.products.map( item => <CartItem key={`cartItem-${item.product.id}`} data={item} deleteFromCart={this.deleteFromCart}/>)
                  }
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <h3 className="title is-4 has-text-centered">Resumen de la Orden:</h3>
                      <hr/>
                      <p className="has-text-centered has-text-weight-bold">Subtotal:</p>
                      <h3 className="title is-3 has-text-centered has-text-danger">L {formatMoney(internals.totalPrice)}</h3>
                      <p className="has-text-centered has-text-weight-bold">Total Items: {internals.totalItems}</p>
                      <p className="has-text-centered"><small>ISV inclu&iacute;do</small></p>
                      <hr/>
                      <h3 className="title is-4 has-text-centered">M&eacute;todo de Envio:</h3>
                      <div className="has-text-centered">
                        <div className="field">
                          <div className="select is-rounded is-danger">
                            <select onChange={ e => this.changeDelivery(e.target.value)}>
                              <option value="dom">Entrega a Domicilio</option>
                              <option value="rgt">Recoger en tienda</option>
                            </select>
                          </div>
                        </div>
                        <p className="has-text-weight-bold"><small>* La entrega a domicilio tiene un costo extra.</small></p>
                      </div>
                      <hr/>
                      <form action="">
                        <h3 className="title is-4 has-text-centered">Datos de la Orden:</h3>
                        <div className="field">
                          <label className="label">Nombre:</label>
                          <div className="control">
                            <input className="input is-rounded is-small" type="text" placeholder="Nombre de la persona que recibe" />
                          </div>
                        </div>
                        {/* Email */}
                        <div className="field">
                          <label className="label">Correo Electr&oacute;nico:</label>
                          <div className="control">
                            <input className="input is-rounded is-small" type="email" placeholder="Correo Electr&oacute;nico" />
                          </div>
                        </div>
                        {/* Telefono */}
                        <div className="field">
                          <label className="label">Tel&eacute;fono:</label>
                          <div className="control">
                            <input className="input is-rounded is-small" type="text" placeholder="Tel&eacute;fono" />
                          </div>
                        </div>
                        {/* Direccion */}
                        <div className="field">
                          <label className="label">Direcci&oacute;n:</label>
                          <div className="control">
                            <textarea className="textarea" placeholder="Textarea"></textarea>
                          </div>
                        </div>
                      </form>
                      <hr/>
                      <div className="row">
                        <div className="columns is-mobile">
                          <div className="column"><p className="has-text-right has-text-weight-bold">Subtotal:</p></div>
                          <div className="column"><p className="has-text-right has-text-weight-bold">L {formatMoney(internals.totalPrice)}</p></div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="columns">
                          <div className="column"><p className="has-text-right has-text-weight-bold">Envio:</p></div>
                          <div className="column"><p className="has-text-right has-text-weight-bold">L {formatMoney(this.state.shipping)}</p></div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="columns">
                          <div className="column"><p className="has-text-right has-text-weight-bold">Total:</p></div>
                          <div className="column"><p className="has-text-right has-text-weight-bold">L {formatMoney(internals.totalPrice + this.state.shipping)}</p></div>
                        </div>
                      </div>
                      <hr/>
                      <div className="buttons is-centered">
                        {!this.state.isLoading && internals.products.length > 0 &&<button className="button is-danger">Ordernar</button>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </section>
      </>
    );
  }
}

const CartPage = withFirebase(CartPageBase);

export default CartPage;



