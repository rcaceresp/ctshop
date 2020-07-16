import React from 'react';
import Menu from '../../components/account/menu';
import Loader from '../../components/loader/bversion';
 
import { AuthUserContext, withAuthorization } from '../../components/session';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      hasPerformedChange: false,
      error: []
    };

    this.setField = this.setField.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.doPass = this.doPass.bind(this);
  }

  setField(e) {
    this.setState({[e.target.name]: e.target.value});
    this.setState({ hasPerformedChange: true });
  }

  async saveChanges() {
    try {
      this.setState({ loading: true, error: []});
      const name = this.state.nombre.trim()

      if (name.length === 0) {
        this.setState({ error: ['Nombre no puede estar vacio'], loading: false});
        
        return;
      }

      await this.props.firebase.db.ref(`/users/${this.props.firebase.auth.currentUser.uid}`).update({nombre:name});

      this.setState({ loading: false});
    } catch(e) {
      this.setState({ loading: false});
      console.log(e.message);
    }
  }

  async doPass(email) {
    this.setState({ loading: true});
    try {
      await this.props.firebase.doPasswordResetEmail(email);

      this.setState({ loading: false});
    } catch(e) {
      this.setState({ loading: false});
      console.log(e.message);
    }
  }

  render(){
    return(
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
                      <h3 className="title is-3">Tu Perfil</h3>
                      <hr/>
                      <div className="field">
                        <label htmlFor=""><b>Nombre:</b></label>
                        <div className="control">
                          <input className="input" name="nombre" defaultValue={authUser.nombre} type="text" placeholder="Nombre" onChange={e => this.setField(e)}/>
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor=""><b>Correo Electronico:</b></label>
                        <div className="control">
                          <input className="input" defaultValue={authUser.email} type="text" placeholder="Primary input" disabled/>
                        </div>
                      </div>
                      <hr/>
                      {this.state.loading === true && <Loader />}
                      {this.state.error.length > 0 && <div className="tags">
                        {this.state.error.map( error => <span className="tag is-danger">{error}</span>)}
                      </div>}
                      <div className="buttons">
                        <button className="button is-success" disabled={!this.state.hasPerformedChange} onClick={this.saveChanges}>Guardar Cambios</button>
                        <button className="button is-info" onClick={() => this.doPass(authUser.email)}>Restablecer contrase&ntilde;a</button>
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
  }
}

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);