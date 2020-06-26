import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import { getCartWithData, setToLocalStorage } from '../../utils/cart';
import Loader from '../../components/loader/bversion';
import CartItem from '../../components/cartItem';
import {formatMoney, priceWithDiscount} from '../../utils/products';
import shortId from 'shortid';

const internals = {
  products: [],
  carEmptyMessage: 'El carrito esta vacio',
  erroOcurred: false,
  totalItems: 0,
  totalPrice: 0,
  shipping: 0,
  oc: {},
  dolar: 24.7126,
  clientname: null,
  email: null,
  address: null,
  phone: null
}

class CartPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shipping: 0,
      errors: [],
      paybutton: false
    };

    this.changeDelivery = this.changeDelivery.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.renderPayButton = this.renderPayButton.bind(this);
    this.setInfo = this.setInfo.bind(this);
    this.checkForErrors = this.checkForErrors.bind(this);
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

      this.setState({ isLoading: false, shipping }, _ => this.renderPayButton());

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

  setInfo(e) {
    internals[e.target.name] = e.target.value;
    this.checkForErrors();
  }

  checkForErrors() {
    const { clientname, email, address, phone } = internals;
    const errors = [];
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (clientname === null || clientname.length === 0) errors.push('Debes proveer un nombre valido');
    if (emailRegex.test( email ) === false) errors.push('Debes proveer un correo electronico valido');
    if (address === null || address.length === 0) errors.push('Debes proveer una direccion valida');
    if (phone === null || phone.length === 0) errors.push('Debes proveer un Telefono valido');

    this.setState({ errors });

    return errors.length ? true : false;
  }

  renderPayButton() {
    const {checkForErrors } = this;
    
    if (this.props.firebase.auth.currentUser !== null) {
      window.paypal.Buttons({
        createOrder: async (data, actions) => {
          if (checkForErrors()) {
            
            return;
          }
          return actions.order.create({
              purchase_units: [
                {       
                  amount: {
                    currency_code: 'USD',
                    value: formatMoney((internals.totalPrice + this.state.shipping)/internals.dolar),
                  },
                },
              ],
          });
        },
        onApprove: async (data, actions) => {
          const { products, totalItems, totalPrice, dolar, clientname, email, address, phone, oc } = internals;
          const { shipping: stateShipping } = this.state;
          const userid = this.props.firebase.auth.currentUser.uid;
          const clientOrder = {
            orderId: shortId.generate(),
            products,
            totalItems,
            totalPrice,
            shipping: stateShipping,
            dolar,
            clientname,
            email,
            address,
            phone,
            oc,
            stateShipping,
            ordertime: Date.now(),
            orderTotal: totalPrice + stateShipping
          };          

          return actions.order.capture().then( async details => {
            try{
              if (details.status === 'COMPLETED') {
                clientOrder.paymentDetails = {
                  id: details.id,
                  status: details.status,
                  createTime: details.create_time,
                  updateTime: details.update_time
                };
                const orderTransaction = await this.props.firebase.db.ref(`users/${userid}/orders/${clientOrder.orderId}`).set({ ...clientOrder });

                console.log(orderTransaction);

                this.props.history.push({
                  pathname: `/confirmacion/${clientOrder.orderId}`,
                  state: {}
                });
              }

              console.log('unable to complete payment');
            } catch(e) {
              console.log(e.message);
            }
          });
        },
        onError: err => {
            console.log(err);
        }
      }).render('#paypal-button-container');

      internals.paybutton = true;
    }
  }

  render() {
    return(
      <>
        <section className="section">
          <div className="container">
            <div className="row">
              <h2 className="title is-3 has-text-black">Tu Carrito</h2>
              <hr/>
              {this.state.isLoading && <Loader />}
              {!this.state.isLoading && internals.erroOcurred && <p className="title is-4 has-text-centered">Ooops! Un error ha ocurrido.</p>}
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
                          <div className="select is-rounded is-danger is-small">
                            <select onChange={ e => this.changeDelivery(e.target.value)}>
                              <option value="dom">Entrega a Domicilio</option>
                              <option value="rgt">Recoger en tienda</option>
                            </select>
                          </div>
                        </div>
                        <p className="has-text-weight-bold"><small>* La entrega a domicilio tiene un costo extra.</small></p>
                      </div>
                      <hr/>
                      <h3 className="title is-4 has-text-centered">Datos de la Orden:</h3>
                      <div className="field">
                        <label className="label">Nombre:</label>
                        <div className="control">
                          <input name="clientname" className="input is-rounded is-small" type="text" placeholder="Nombre de la persona que recibe" onChange={e => this.setInfo(e)}/>
                        </div>
                      </div>
                      {/* Email */}
                      <div className="field">
                        <label className="label">Correo Electr&oacute;nico:</label>
                        <div className="control">
                          <input name="email" className="input is-rounded is-small" type="email" placeholder="Correo Electr&oacute;nico" onChange={e => this.setInfo(e)}/>
                        </div>
                      </div>
                      {/* Telefono */}
                      <div className="field">
                        <label className="label">Tel&eacute;fono:</label>
                        <div className="control">
                          <input name="phone" className="input is-rounded is-small" type="text" placeholder="Tel&eacute;fono" onChange={e => this.setInfo(e)}/>
                        </div>
                      </div>
                      {/* Direccion */}
                      <div className="field">
                        <label className="label">Direcci&oacute;n:</label>
                        <div className="control">
                          <textarea name="address" className="textarea" placeholder="Direcci&oacute;n" onChange={e => this.setInfo(e)}></textarea>
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="columns is-mobile">
                          <div className="column is-half"><p className="has-text-right has-text-weight-bold">Subtotal:</p></div>
                          <div className="column is-half"><p className="has-text-right has-text-weight-bold">L {formatMoney(internals.totalPrice)}</p></div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="columns">
                          <div className="column is-half"><p className="has-text-right has-text-weight-bold">Envio:</p></div>
                          <div className="column is-half"><p className="has-text-right has-text-weight-bold">L {formatMoney(this.state.shipping)}</p></div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="columns">
                          <div className="column is-half"><p className="has-text-right has-text-weight-bold">Total:</p></div>
                          <div className="column is-half"><p className="has-text-right has-text-weight-bold">L {formatMoney(internals.totalPrice + this.state.shipping)} <small>(USD {formatMoney((internals.totalPrice +this.state.shipping)/internals.dolar)})</small></p></div>
                        </div>
                      </div>
                      <hr/>
                      <div className="tags is-centered">
                        {this.state.errors.length !== 0 && this.state.errors.map( item => <span className="tag is-danger is-rounded"><b>{item}</b></span>)}
                      </div>
                      <div id="paypal-button-container" />
                      {this.props.firebase.auth.currentUser === null && <>
                        <p className="has-text-weight-bold has-text-centered"><span className="icon"><i className="fa fa-exclamation-triangle" /></span> <span>Debes iniciar sesi&oacute;n para realizar la compra</span></p>
                      </>}
                      {/* <div className="buttons is-centered">
                        {!this.state.isLoading && internals.products.length > 0 &&<button className="button is-danger">Ordernar</button>}
                      </div> */}
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



