import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; 
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../vendor/firebase';
// import Loader from '../../components/loade

const INITIAL_STATE = {
  username: '',
  nombre: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  loading: false
};
 
const SignUpPage = () => (
  <section className="section">
    <div className="container">
      <h3 className="title is-2 has-text-centered">Reg&iacute;strate</h3>
      <hr/>
      <p className="has-text-centered">Llena el formulario a continuaci&oacute;n y se parte de este emprendimiento en favor de la comunidad.</p>
      <hr/>
      <div className="row">
        <div className="columns is-centered is-desktop">
          <div className="column is-two-fifths">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  </section>
);
 
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    event.preventDefault();
    const { email, passwordOne, nombre } = this.state;
    this.setState({ loading: true });

    if (nombre.trim().length === 0) {
      this.setState({ loading: false, error : 'Tu Nombre es requerido'});
      
      return;
    }
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        console.log(authUser);
        
        this.props.firebase.db.ref(`/users/${authUser.user.uid}/`).set({
          email,
          nombre,
          type: 'client'
        });

        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ loading: false, error: error.message });
      });
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      nombre,
      email,
      error,
      loading,
      passwordOne,
      passwordTwo,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <div className="card is-info">
        <p className="has-text-centered">
          <br/>
          <img src="activation.svg" alt="Reg&iacute;strate" width="80"/>
        </p>
        <div className="card-content">
          
          <form onSubmit={this.onSubmit}>
            <div className="field">
              <label className="label">Nombre Completo:</label>
              <div className="control has-icons-left is-expanded">
                <input required="required" name="nombre" value={nombre} onChange={this.onChange} type="text" placeholder="Nombre Completo" className="input"/>
                <span className="icon is-left"><i className="fa fa-user" /></span>
              </div>  
            </div>
            <div className="field">
              <label className="label">Correo Electr&oacute;nico</label>
              <div className="control has-icons-left is-expanded">
                <input required="required" name="email" value={email} onChange={this.onChange} type="text" placeholder="Correo Electr&oacute;nico" className="input"/>
                <span className="icon is-left"><i className="fa fa-envelope" /></span>
              </div>  
            </div>
            <div className="field">
              <label className="label">Contrase&ntilde;a</label>
              <div className="control has-icons-left ">
                <input required="required" name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Contrase&ntilde;a" className="input"/>
                <span className="icon is-left"><i className="fa fa-lock" /></span>
              </div>
            </div>
            <div className="field">
              <label className="label">Reingresa la Contrase&ntilde;a</label>
              <div className="control has-icons-left ">
                <input required="required" name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Reingresa la Contrase&ntilde;a" className="input"/>
                <span className="icon is-left"><i className="fa fa-lock" /></span>
              </div>
            </div>
            <hr/>
            <div className="control">
              <div className="buttons">
                <button className={`button is-info ${loading ? 'is-loading':''}`} disabled={isInvalid} type="submit">Registrarme</button> 
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
          <button className="button is-text is-small">T&eacute;rminos y Condiciones</button>
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

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
 
export { SignUpForm, SignUpLink };