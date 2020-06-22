import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import { normalizeStores } from '../../utils/stores';
import Store from '../tiendasCard';
import Loaderb from '../loader/bversion';


class AfiliadosBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.firebase.companies().limitToFirst(5).once('value').then( snapshot => {
      const resp = snapshot.val();

      if (resp !== null) {
        let stores = normalizeStores(resp);


        if (stores.length) {
          this.setState({ stores });
        }

      }

      this.setState({isLoading: false});
    });
  }

  render() {
    const { stores, isLoading } = this.state;
    
    return (
      <React.Fragment>
        {showContent(isLoading, stores)}
      </React.Fragment>
    );
  }
}

const showContent = (isLoading = true, stores = null) => {
  return isLoading ? <section className="section"><Loaderb /></section> : <section className="section">
    <div className="container">
      <h4 className="title is-4 has-text-weight-bold">Reci&eacute;n Afiliados</h4>
      <hr/>
      <div className="row">
        <div className="columns is-multiline is-mobile">
          {stores && stores.length && stores.map( store => <Store data={store}/>)}
          {!stores && <p className="has-text-center">No hay ofertas</p>}
        </div>{/*  Columns */}
      </div>
    </div>
  </section>;
};

const Afiliados = withFirebase(AfiliadosBase);

export default Afiliados;