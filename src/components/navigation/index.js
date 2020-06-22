import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../session';

// Custom
import SignOutButton from './signoutButton';

// const Navigation = () => (
//   <AuthUserContext.Consumer>
//     {authUser => buildMenu(authUser)}
//   </AuthUserContext.Consumer>
// );

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuIsOpen: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    e.preventDefault();
    const menuIsOpen = this.state.menuIsOpen;

    this.setState({ menuIsOpen: !menuIsOpen});
  }

  render() {
    const { menuIsOpen } = this.state;
    const { toggleMenu } = this;
    const menuIsOpenClassString = menuIsOpen ? 'is-active' : '';


    return(
      <AuthUserContext.Consumer>
        {authUser => <nav className="navbar is-light is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="/logo.png" height="28" alt="CatrachosShop"/>
            </a>

            <a href="##" onClick={toggleMenu} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          {/* Menu Items */}
          <div className={`navbar-menu ${menuIsOpenClassString} is-light`}>
            <div className="navbar-start">
              {/* <Link to={ROUTES.HOME} className="navbar-item"><b>Inicio</b></Link> */}
              <a href="https://admin.catrachosshop.com/" target="_blank" rel="noopener noreferrer" className="navbar-item"><b>Empieza a vender</b></a>
              <Link to={ROUTES.ABOUT_US} className="navbar-item"><b>¿Como funciona?</b></Link>
              <Link to={ROUTES.AFILLIATES} className="navbar-item"><b>Nuestras Tiendas</b></Link>
            </div>
            <div className="navbar-end">
              <a className="navbar-item is-link is-small" href="/carrito"><i className="fa fa-shopping-cart" /></a>
              {!authUser && <Link to={ROUTES.SIGN_UP} className="navbar-item is-link is-small">
                <span className="icon"><i className="fa fa-id-badge"/></span><b>Registrate</b>
              </Link>}
              {!authUser && <Link to={ROUTES.SIGN_IN} className="navbar-item is-link is-small">
                  <span className="icon"><i className="fa fa-sign-in"/></span><b>Inicia Sesi&oacute;n</b>
              </Link>}
              {authUser && <Link to={ROUTES.ACCOUNT} className="navbar-item is-link is-small">
                  <span className="icon"><i className="fa fa-user"/></span><b>Mi Cuenta</b>
              </Link>}
              {authUser && <SignOutButton />}
            </div>
          </div>
        </nav>}
      </AuthUserContext.Consumer>
    );
  }
}

export default Menu;