// Dependencies
import React from 'react';

const Spinner = () => {
  return(
    <div className="has-text-centered spinner-holder">
      <img className="spinnerImg" src="nebula.svg" width="50" alt="Procesando. Porfavor espere..."/>
      <p><small><b>Procesando...Espera un momento</b></small></p>
    </div>
  );
};

export default Spinner;
