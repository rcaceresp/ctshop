import React from 'react';
import { Link } from 'react-router-dom';

const TiendasCard = props => {
  const { _id, company, tel, images = null } = props.data;
  const image = images && images.trim().length ? images : '/no-img.png';

  return(
    <div className="column is-two-fifth-mobile is-one-quarter-tablet is-one-fifth-widescreen">
      <div class="card product-card">
        <div class="card-image">
          <figure class="image is-4by3">
            <Link to={`/tienda/${_id}`}><img src={image} alt="Catrachos Shop" lazy/></Link>
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <Link to={`/tienda/${_id}`}><h5 class="product-title title is-5 has-text-weight-bold">{company}</h5></Link>
            <br/>
            <div className="buttons is-centered">
              <div className="button is-danger is-small"><b>Ver productos</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TiendasCard;