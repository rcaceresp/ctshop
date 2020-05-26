import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
 
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../vendor/firebase';

// Pages
import Home from '../../pages/home';
import Signup from '../../pages/signup';
import Signin from '../../pages/signin';

class App extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <Router>
        <Navigation authUser={this.state.authUser}/>
        <div className="has-background-white">
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.SIGN_UP} component={Signup} />
          <Route exact path={ROUTES.SIGN_IN} component={Signin} />
        </div>
        <Footer/>
      </Router>
    );
  }
}

export default withFirebase(App);