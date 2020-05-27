import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
 
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../session';

// Pages
import Home from '../../pages/home';
import Signup from '../../pages/signup';
import Signin from '../../pages/signin';
import Account from '../../pages/account';

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <Navigation/>
        <div className="has-background-white">
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.SIGN_UP} component={Signup} />
          <Route exact path={ROUTES.SIGN_IN} component={Signin} />
          <Route exact path={ROUTES.ACCOUNT} component={Account} />
        </div>
        <Footer/>
      </Router>
    );
  }
}

export default withAuthentication(App);