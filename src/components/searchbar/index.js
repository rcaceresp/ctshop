import React from 'react';
import Typewriter from 'typewriter-effect/dist/core';

const type = () => {
  const typeWriterEl = document.querySelector('.typewriter-show');

    if (typeWriterEl) {
      const tw = new Typewriter(typeWriterEl, {
        strings: ['Que estas buscando?','Tenis', 'Refrigeradoras','Chile'],
        autoStart: true,
        loop: false,
        cursor: '_',
        pauseFor: 5000
      });

      tw.start();
    }
};

const SearchBar = () => {
  type();
  
  return (
    <section className="section hero is-small is-bold" style={ {paddingTop: '2rem', paddingBottom: '1.5rem'}}>
      <div className="hero-body" style={ {paddingTop: 0, paddingBottom: 0}}>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-two-thirds has-text-centered">
              <h6 className="title is-4 has-text-centered">
                <span>¿Qu&eacute; estas buscando?</span>
              </h6>
              <div className="field has-addons">
                <div className="control is-expanded has-icons-left">
                  <input
                    className="input is-primary is-rounded"
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
                  <button className="button is-primary is-rounded " onClick={ e => {}}>
                    <span className="icon">
                      <i className="fa fa-search" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
 );
};

export default SearchBar;