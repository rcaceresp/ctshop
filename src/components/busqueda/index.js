import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import Loader from '../loader/bversion';
import SearchBar from  '../searchbar';
import { categories } from '../../constants/categories';

const client = algoliasearch('JMZRBX4JGB', 'd1bde073070f32b4e78c356083cb55cd');
const index = client.initIndex('ctindex');

class BusquedaResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true
    };
  }

  async componentDidMount(){
    try {
      const data = await index.search(`${this.props.query.queryString} ${this.props.query.category}`);

      this.setState({ data: data.hits, loading: false });
    } catch(e) {
      console.log(e.message);

      this.setState({ loading: false });
    }
  }

  render() {
    return(
      <>
      <SearchBar noText/>
      <section className="section">
        <div className="container">
          <h3 className="title is-4 has-text-centered">Buscando "{this.props.query.queryString}" en "{categories[this.props.query.category]}"</h3>
          <hr/>
          {this.state.loading === true && <Loader/>}
          {this.state.loading === false && this.state.data.length === 0 && <p className="has-text-centered">No hay resultados para la busqueda</p>}
          {this.state.loading === false && this.state.data.length > 0 && <p>{this.state.data.length}</p>}
        </div>
      </section>
      </>
    );
  }
}

export default BusquedaResults;