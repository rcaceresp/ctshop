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
              <div className="column">
                <div className="card">
                  <div className="card-content">
                    <h3 className="title is-3">Bienvenido, {authUser.email}</h3>
                    <hr/>
                    <div className="table-container">
                      <table className="table is-fullwidth is-striped">
                        <thead>
                          <tr>
                            <th><abbr title="Position">#</abbr></th>
                            <th>Nombre</th>
                            <th><abbr title="Played">precio</abbr></th>
                            <th><abbr title="Won">total</abbr></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>1</th>
                            <td>36</td>
                            <td>+32</td>
                            <td>81</td>
                          </tr>
                          <tr>
                          <th>1</th>
                            <td>36</td>
                            <td>+32</td>
                            <td>81</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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