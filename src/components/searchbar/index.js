import React from 'react';
import Typewriter from 'typewriter-effect/dist/core';

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
  componentDidMount(){
    type();
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
                <div className="control is-expanded has-icons-left">
                  <input
                    className="input is-danger is-rounded"
                    type="text"
                    placeholder="Encuentra lo que buscas, Aqu&iacute;"
                    onChange={ (e) => {}}
                    onKeyPress={(e) => {}}
                  />
                  <span className="icon is-large is-left">
                    <i className="fa fa-search"/>
                  </span>
                </div>
                <div className="control">
                  <button className="button is-danger is-rounded " onClick={ e => {}}>
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