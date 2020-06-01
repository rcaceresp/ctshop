import * as app from 'firebase';
import { firebaseconfig } from './config';
import FirebaseContext, { withFirebase } from './context';

class Firebase {
  constructor() {
    app.initializeApp(firebaseconfig);
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => {
    this.auth.signOut();
    window.location = '/';
  };
  
  products = () => this.db.ref('products');
}

export default Firebase;

export { FirebaseContext, withFirebase };