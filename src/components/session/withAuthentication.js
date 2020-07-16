import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../../vendor/firebase'; 


const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
 
      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        const user = authUser ? {...authUser} : null;

        if (user) {
          this.props.firebase.db.ref(`/users/${user.uid}`).once('value').then( snap => {
            const info = snap.val();

            user.nombre = info.nombre;

            this.setState({ authUser: user })
          });
        } else {
          this.setState({ authUser: null });
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }


    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
 
  return withFirebase(WithAuthentication);
};
 
export default withAuthentication;