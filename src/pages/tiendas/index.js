import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import TiendasCard from '../../components/tiendasCard';
import Loaderb from '../../components/loader/bversion';
import {normalizeStores} from '../../utils/stores';
import SearchBar from '../../components/searchbar';

const internals = {
  tiendas: [],
};

class TiendasPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
   try {
    const storesRequest = await this.props.firebase.companies().once('value');
    const storesData = storesRequest.val();

    if( storesData !== null) internals.tiendas = normalizeStores(storesData);

    this.setState({ isLoading: false});
   } catch(e) {
     console.log(e.message);
     this.setState({ isLoading: false});
   }
  }

  render() {
    
    return (
      <>
        <SearchBar noText={true}/>
        <section className="section">
          <div className="container">
            <h2 class="title is-3 has-text-black">Nuestros afiliados</h2>
            <hr/>
            {this.state.isLoading && <Loaderb />}
            <div className="row">
              <div className="columns is-multiline is-mobile">
                {!this.state.isLoading && internals.tiendas.length > 0 && internals.tiendas.map( tienda => <TiendasCard data={tienda}/>)}
                {!this.state.isLoading && !internals.tiendas.length === 0 && <p className="has-text-center">No hay Tiendas afiliadas por el momento</p>}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const TiendasPage = withFirebase(TiendasPageBase);

export default TiendasPage;