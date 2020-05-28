import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../vendor/firebase';
// import Loader from '../../components/loader';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  error: null,
  loading: false
};
 
const SignInPage = () => (
  <section className="section">
    <div className="container">
      <h3 className="title is-2 has-text-centered">Inicia Sesi&oacute;n</h3>
      <hr/>
      <p className="has-text-centered">Ingresa tus credenciales.</p>
      <hr/>
      <div className="row">
        <div className="columns is-centered is-desktop">
          <div className="column is-two-fifths">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  </section>
);
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

  }
 
  onSubmit = event => {
    const { email, password } = this.state;
    this.setState({ loading: true });
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then( () => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ loading: false, error: error.message });
      });
 
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      email,
      error,
      loading,
      password
    } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="card is-info">
        <p className="has-text-centered">
          <br/>
          <img src="key.svg" alt="Registrate" width="80"/>
        </p>
        <div className="card-content">
          <form onSubmit={this.onSubmit}>
            <div className="field">
              <label className="label">Correo Electr&oacute;nico</label>
              <div className="control has-icons-left is-expanded">
                <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Correo Electronico" className="input"/>
                <span className="icon is-left"><i className="fa fa-envelope" /></span>
              </div>  
            </div>
            <div className="field">
              <label className="label">Contrase&ntilde;a</label>
              <div className="control has-icons-left ">
                <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Contrase&ntilde;a" className="input"/>
                <span className="icon is-left"><i className="fa fa-lock" /></span>
              </div>
            </div>
            <hr/>
            <div className="control">
              <div className="buttons">
                <button className={`button is-info ${loading ? 'is-loading':''}`} disabled={isInvalid} type="submit">Ingresar</button> 
                <button className="button is-text">Olvid&eacute; mi contrase&ntilde;a</button>
              </div>
            </div>
          </form>
          {error && <p className="has-text-centered">
            <br/><span class="tag is-danger">{error}</span>
          </p>}
        </div>
        <hr/>
        <div className="buttons is-centered">
          <button className="button is-text is-small">Terminos y Condiciones</button>
        </div>
      </div>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
 
export { SignInForm, SignUpLink };