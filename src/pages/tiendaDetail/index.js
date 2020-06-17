import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import {normalizeProducts} from '../../utils/products';
import Loaderb from '../../components/loader/bversion';
import ProductCard from '../../components/productCard';



const internals = {
  products: [],
  tienda: null
};

class TiendaDetailPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    try {
      const productsRequest = await this.props.firebase.db.ref(`/products/${this.props.tienda}`).once('value');
      const tiendaRequest = await this.props.firebase.db.ref(`/companies/${this.props.tienda}`).once('value');

      const productsData = productsRequest.val();
      const tiendaData = tiendaRequest.val();

      console.log(tiendaData)

      let products = [];

      if (productsData !== null) {
        products = normalizeProducts( { [this.props.tienda] : productsData});

        if(products.length) internals.products = products;
        this.setState({isLoading: false});
      }
      
      if (tiendaData !== null) {
        internals.tienda = tiendaData;
      }

      this.setState({isLoading:false});

    } catch(e){
      console.log(e.message);
      this.setState({isLoading:false});
    }
  }
    

  render() {
    return (
      <section className="section">
        <div className="container">
          <h2 className="title is-1 has-text-black has-text-weight-bold"><img src={internals.tienda ? internals.tienda.images: internals.tienda} width="100"/> { internals.tienda ? internals.tienda.company: internals.tienda}</h2>
          <p>{ internals.tienda ? internals.tienda.description: internals.tienda}</p>
          <p> <b>Direcci&oacute;n: </b>{ internals.tienda ? internals.tienda.saddress: internals.tienda}</p>
          <hr/>
          <h2 className="title is-4">Nuestros productos:</h2>
          <div className="row">
            <div className="columns is-multiline is-mobile">
              {!this.state.isLoading && !internals.products.length === 0 && <p className="has-text-center">No hay productos que mostrar</p>}
              {!this.state.isLoading && internals.products.length > 0 && internals.products.map( (product, i) => <ProductCard key={`storeProduct-${i}`} product={product}/>)}
            </div>{/*  Columns */}
          </div>
        </div>
      </section>
    );
  }
}

const TiendaDetailPage = withFirebase(TiendaDetailPageBase);

export default TiendaDetailPage;