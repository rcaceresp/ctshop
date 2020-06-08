// Dependencies
import React from 'react';

const Spinner = props => {
  return(
    <div className="has-text-centered spinner-holder">
      <img className="spinnerImg" src="/nebula.svg" width="50" alt="Procesando. Porfavor espere..."/>
      {props.withMessage && <p><small><b>Procesando...Espera un momento</b></small></p>}
    </div>
  );
};

export default Spinner;
