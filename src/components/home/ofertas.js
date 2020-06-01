import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import { normalizeProducts } from '../../utils/products';

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
          <h4 className="title is-2">Ofertas</h4>
          <hr/>
          <div className="row">
            <div className="columns is-multiline">
              {ofertas && ofertas.length && ofertas.map( oferta => <div className="column is-one-fifth">
                <div class="card product-card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img src={oferta.images[0]} alt="Catrachos Shop" />
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <h5 class="product-title title is-4 has-text-weight-bold">{oferta.name} <br/> <span className="tag is-small is-light">Vendido Por: Reina Caceres</span></h5>
                        <div className="tags">
                        </div>
                      </div>
                    </div>
                    <div class="content">
                      <hr/>
                      <div className="buttons is-centered">
                        <button className="button is-warning is-rounded is-small has-text-weight-bold">
                          <span className="icon"><i className="fa fa-eye"/></span><span>Ver</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
            </div>{/*  Columns */}
          </div>
        </div>
      </section>
    );
  }
}

const Ofertas = withFirebase(OfertasBase);

export default Ofertas;