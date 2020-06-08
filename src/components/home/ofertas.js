import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import { normalizeProducts } from '../../utils/products';
import Product from '../productCard';


class OfertasBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ofertas: null
    };
  }

  componentDidMount() {
    this.props.firebase.products().once('value').then( snapshot => {
      const resp = snapshot.val();

      if (resp !== null) {
        let ofertas = normalizeProducts(resp);

        // ofertas = ofertas.filter( oferta => oferta.hasOffer );

        if (ofertas.length) {
          this.setState({ ofertas });
        } 
      }
    });
  }

  render() {
    const { ofertas } = this.state;

    return (
      <section className="section">
        <div className="container">
          <h4 className="title is-2 has-text-weight-bold">Ofertas</h4>
          <hr/>
          <div className="row">
            <div className="columns is-multiline is-mobile">
              {ofertas && ofertas.length && ofertas.map( oferta => <Product product={oferta}/>)}
            </div>{/*  Columns */}
          </div>
        </div>
      </section>
    );
  }
}

const Ofertas = withFirebase(OfertasBase);

export default Ofertas;