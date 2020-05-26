import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';

// Custom
import SignOutButton from './signoutButton';

const Navigation = ({ authUser = null }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        <img src="logo.png" height="28" alt="CatrachosShop"/>
      </a>

      <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    {/* Menu Items */}
    <div className="navbar-menu">
      <div className="navbar-start">
        <Link to={ROUTES.HOME} className="navbar-item"><b>Inicio</b></Link>
        {/* <Link to={ROUTES.SIGN_UP} className="navbar-item">Tiendas</Link> */}
      </div>
    </div>
    <div className="navbar-end">
      <Link className="navbar-item is-link is-small" to="/cart"><i className="fa fa-shopping-cart" /></Link>
      {!authUser && <Link to={ROUTES.SIGN_UP} className="navbar-item is-link is-small">
        <span className="icon"><i className="fa fa-id-badge"/></span><b>Registrate</b>
      </Link>}
      {!authUser && <Link to={ROUTES.SIGN_IN} className="navbar-item is-link is-small">
          <span className="icon"><i className="fa fa-sign-in"/></span><b>Inicia Sesi&oacute;n</b>
      </Link>}
      {authUser && <SignOutButton />}
    </div>
  </nav>
);
 
export default Navigation;