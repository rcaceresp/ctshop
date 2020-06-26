import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import { normalizeProducts } from '../../utils/products';
import Product from '../productCard';
import Loaderb from '../loader/bversion';


class OfertasBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ofertas: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.firebase.products().once('value').then( snapshot => {
      const resp = snapshot.val();

      if (resp !== null) {
        let ofertas = normalizeProducts(resp);

        ofertas = ofertas.filter( oferta => (oferta && oferta.descuento && oferta.descuento.porcentaje > 0) );

        if (ofertas.length) {
          ofertas = ofertas.slice(0,5);
          this.setState({ ofertas });
        }
      }

      this.setState({isLoading: false});
    });
  }

  render() {
    const { ofertas, isLoading } = this.state;
    
    return (
      <React.Fragment>
        {showContent(isLoading, ofertas)}
      </React.Fragment>
    );
  }
}

const showContent = (isLoading = true, ofertas = null) => {
  return isLoading ? <section className="section"><Loaderb /></section> : <section className="section">
    <div className="container">
      <h4 className="title is-4 has-text-weight-bold">Ofertas</h4>
      <hr/>
      <div className="row">
        <div className="columns is-multiline is-mobile">
          {ofertas && ofertas.length && ofertas.map( oferta => <Product product={oferta}/>)}
          {!ofertas && <p className="has-text-center">No hay ofertas</p>}
        </div>{/*  Columns */}
      </div>
    </div>
  </section>;
};

const Ofertas = withFirebase(OfertasBase);

export default Ofertas;