import React from 'react';
 
import { AuthUserContext, withAuthorization } from '../../components/session';

 
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="columns">
              <div className="column is-one-quarter">
                <aside className="menu card">
                  <div className="card-content">
                    <p className="menu-label">
                      Ordenes
                    </p>
                    <ul className="menu-list">
                      <li><a href="/">Pendientes</a></li>
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
                  </div>
                </aside>
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