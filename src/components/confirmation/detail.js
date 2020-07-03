import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import Loaderb from '../loader/bversion';
import CartItem from '../cartItem';
import { formatMoney } from '../../utils/products';

const internals = {
  order: null
};

class ConfirmationDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const userid = this.props.firebase.auth.currentUser.uid;
      const order = await this.props.firebase.db.ref(`users/${userid}/orders/${this.props.order}`).once('value');

      internals.order = order.val();

      this.setState({ loading: false });
    } catch(e) {
      console.log(e.message);

      this.setState({ loading: false });
    }
  }

  render() {
    return(
      <section className="section">
        <div className="container">
          {this.state.loading === true && <Loaderb />}
          {this.state.loading === false && internals.order === null && <>
            <h1 className="title is-3 has-text-centered"><b>Oops! La orden no existe</b></h1>
            <div className="buttons is-centered"><a href="/" className="button is-small is-danger"><b>Volver al inicio</b></a></div>
          </>}
          {this.state.loading === false && internals.order !== null && <>
            <h2 className="title is-3 has-text-black has-text-centered">Confirmaci&oacute;n de la Orden</h2>
            <hr/>
            <br/><br/>
            <div className="row">
              <div className="columns is-centered">
                <div className="column is-two-thirds card">
                  <div className="row">
                    <div className="columns">
                      <div className="column is-one-third">
                        <h4 className="has-text-centered"><b>Total:</b></h4>
                        <h3 className="title is-3 has-text-centered has-text-danger">
                          L {formatMoney(internals.order.orderTotal)} <br/>
                        </h3>
                        {/* <p className="subtitle has-text-centered has-text-danger"><small><b>L {formatMoney(internals.order.stateShipping)}</b></small></p> */}
                        <p className="has-text-centered has-text-weight-bold">Total Items: {internals.order.totalItems}</p>
                        <div className="tags is-centered">
                          <div className="tag is-info is-light"><b>{internals.order.stateShipping === 0 ? 'Recoger en Tienda' : 'Entrega a Domicilio'}</b></div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <div className="control">
                            <input type="text" className="input is-rounded is-small" value={`Entregar a: ${internals.order.clientname}`} disabled/>
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <input type="text" className="input is-rounded is-small" value={`Telefono: ${internals.order.phone}`} disabled/>
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <input type="text" className="input is-rounded is-small" value={`Direccion: ${internals.order.address}`} disabled/>
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <input type="text" className="input is-rounded is-small" value={`Email: ${internals.order.email}`} disabled/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/><br/><br/><br/>
            <div className="row">
              <div className="columns is-centered">
                <div className="column is-two-thirds">
                  {internals.order && this.state.loading === false && internals.order.products.map( item => <CartItem key={`cartItem-${item.id}`} data={item} deleteFromCart={null}/>)}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="buttons is-centered">
                <a href="/" className="button is-danger is-small"><b>Volver al Inicio</b></a>
              </div>
            </div>
          </>}
        </div>
      </section>
    );
  }
}

export default withFirebase(ConfirmationDetail);