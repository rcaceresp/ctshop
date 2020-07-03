import React from 'react';
import Orders from '../../components/account/orders';
 
import { AuthUserContext, withAuthorization } from '../../components/session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="columns">
              <div className="column is-one-fifth">
                <aside className="menu">
                  <p className="menu-label">Ordenes</p>
                  <ul className="menu-list">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/">Historial</a></li>
                  </ul>
                  <p className="menu-label">
                    Perfil
                  </p>
                  <ul className="menu-list">
                    <li><a href="/">Perfil</a></li>
                    <li><a href="/">Cambiar Contrase&ntilde;a  </a></li>
                    <li><a href="/">Cerrar Sesi&oacute;n </a></li>
                  </ul>
                </aside>
              </div>
              <div className="column">
                <div className="card-content">
                  <h3 className="title is-3">Bienvenido, {authUser.email}</h3>
                  <hr/>
                  <Orders filterValue='pendiente'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )}
  </AuthUserContext.Consumer>
);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);