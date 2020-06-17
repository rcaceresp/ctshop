import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom';
 
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../session';

// Pages
import Home from '../../pages/home';
import Cart from '../../pages/cart';
import Signup from '../../pages/signup';
import Signin from '../../pages/signin';
import Account from '../../pages/account';
import ProductDetailPage from '../../pages/productDetail';
import TiendaDetailPage from '../../pages/tiendaDetail';
import About from '../../pages/about';
import Tiendas from '../../pages/tiendas';

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <Navigation/>
        <div className="has-background-white">
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.CART} component={Cart} />
          <Route exact path={ROUTES.SIGN_UP} component={Signup} />
          <Route exact path={ROUTES.SIGN_IN} component={Signin} />
          <Route exact path={ROUTES.ACCOUNT} component={Account} />
          <Route exact path={ROUTES.ABOUT_US} component={About} />
          <Route exact path={ROUTES.AFILLIATES} component={Tiendas} />
          <Switch>
            <Route path="/producto/:owner/:product" children={<ProductLoader />} />
            <Route path="/tienda/:tienda" children={<TiendaLoader />} />
          </Switch>
        </div>
        <Footer/>
      </Router>
    );
  }
}

function ProductLoader() {
  let { owner, product } = useParams();

  return (<ProductDetailPage owner={owner} product={product}/>);
}

function TiendaLoader() {
  let { tienda } = useParams();

  return (<TiendaDetailPage tienda={tienda} />);
}

export default withAuthentication(App);