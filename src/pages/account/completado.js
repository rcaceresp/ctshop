import React from 'react';
import Orders from '../../components/account/orders';
import Menu from '../../components/account/menu';
 
import { AuthUserContext, withAuthorization } from '../../components/session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="columns">
              <div className="column is-one-fifth">
                <Menu />
              </div>
              <div className="column">
                <div className="card-content">
                  <hr/>
                  <Orders filterValue='completado'/>
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