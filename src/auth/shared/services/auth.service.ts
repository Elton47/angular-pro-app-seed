import { Injectable } from "../../../../node_modules/@angular/core";
import { AngularFireAuth } from '../../../../node_modules/angularfire2/auth';
import { Store } from 'store';
import 'rxjs/add/operator/do';

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable()
export class AuthService {
  auth$ = this.angularFireAuth.authState
    .do(next => {
      if (!next) {
        this.store.set('user', null);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      }
      this.store.set('user', user);
    });
    
  get user() {
    return this.angularFireAuth.auth.currentUser;
  }
  
  get authState() {
    return this.angularFireAuth.authState;
  }

  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store
  ) {}

  createUser(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.angularFireAuth.auth.signOut();
  }
}