import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import { getCartWithData } from '../../utils/cart';
import Loader from '../../components/loader/bversion';
import CartItem from '../../components/cartItem';


const internals = {
  products: [],
  carEmptyMessage: 'El carrito esta vacio',
  erroOcurred: false
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
      const _cart = await getCartWithData(this.props.firebase);
      internals.products = _cart;
      this.setState({ isLoading: false });
    } catch(e) {
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
            {!this.state.isLoading && internals.products.length === 0 && <p>Carrito Vacio</p>}
            {!this.state.isLoading && !internals.erroOcurred && internals.products.map( item => <CartItem key={`cartItem-${item.product.id}`} data={item}/>)}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const CartPage = withFirebase(CartPageBase);

export default CartPage;



