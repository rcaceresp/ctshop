import React from 'react';
 
import { withFirebase } from '../../vendor/firebase';
 
const SignOutButton = ({ firebase }) => (
  <a href="##" className="navbar-item is-link is-small" onClick={firebase.doSignOut}>
    <span className="icon"><i className="fa fa-sign-out"/></span><b>Cerrar Sesi&oacute;n</b>
  </a>
);
 
export default withFirebase(SignOutButton);