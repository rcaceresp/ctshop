import React from 'react';
import Typewriter from 'typewriter-effect/dist/core';
import { getQuery } from '../../utils/searchbar';
import {setToLocalStorage} from '../../utils/cart';


const internals = {
  query: getQuery()
};

const type = () => {
  const typeWriterEl = document.querySelector('.typewriter-show');

    if (typeWriterEl) {
      const tw = new Typewriter(typeWriterEl, {
        strings: ['Computadoras', 'Air Jordan', 'Apple', 'Cocina', 'Juguetes'],
        autoStart: true,
        loop: true,
        cursor: '_',
        pauseFor: 5000
      });

      tw.start();
    }
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: ''
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleEnterPressed = this._handleEnterPressed.bind(this);
    this._handleCategoryChange = this._handleCategoryChange.bind(this);
  }
  componentDidMount(){
    type();
  }

  _handleInputChange(e) {
    internals.query.queryString = e.target.value;
  }

  _handleEnterPressed(e) {

    if (e.charCode === 13) {
      console.log('here');
      this._handleSearch(e);
    }
  }

  _handleCategoryChange(e) {
    let { category } = this.state;
    const value = e.target.value;

    category = value;
    internals.query.category = value;

    this.setState({ category });
  }

  _handleSearch(e) {
    e.preventDefault();
    const { query } = internals;

    if (query.queryString.trim() === '') {

      return;
    }

    query.queryString = query.queryString.trim();

    setToLocalStorage('_app_d', query);

    window.location = '/resultados';
  }

  render() {
    return (
      <section className="section search-bar" style={ {paddingTop: '2rem', paddingBottom: '1.5rem'}}>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-two-thirds has-text-centered">
              {!this.props.noText && <React.Fragment>
                <p className="has-text-centered">
                <span> <b>¿Qu&eacute; estas buscando?</b></span>
              </p>
              <h1 className="title is-1 typewriter-show has-text-weight-bold">Computadoras</h1>
              </React.Fragment>}
              <div className="field has-addons">
                <p class="control">
                  <span className="select is-danger is-rounded has-text-centered">
                    <select onChange={e => this._handleCategoryChange(e)} defaultValue={internals.query.category}>
                      <option value="cuidadop">Cuidado Personal</option>
                      <option value="deporte">Deporte</option>
                      <option value="electrodomesticos">Electrodomésticos</option>
                      <option value="escolar">Escolar y Oficina</option>
                      <option value="electronica">Electrónica</option>
                      <option value="hogar">Hogar</option>
                      <option value="ropa">Ropa y Accesorios</option>
                      <option value="mundob">Mundo del Bebé</option>
                      <option value="calzado">Calzado</option>
                    </select>
                  </span>
                </p>
                <div className="control is-expanded has-icons-left">
                  <input
                    defaultValue={internals.query.queryString}
                    className="input is-danger is-rounded"
                    type="text"
                    placeholder="Encuentra lo que buscas, Aqu&iacute;"
                    onChange={ (e) => this._handleInputChange(e)}
                    onKeyPress={(e) => this._handleEnterPressed(e)}
                  />
                  <span className="icon is-large is-left">
                    <i className="fa fa-search"/>
                  </span>
                </div>
                <div className="control">
                  <button className="button is-danger is-rounded " onClick={ e => this._handleSearch(e)}>
                    <span className="icon">
                      <i className="fa fa-search" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default SearchBar;