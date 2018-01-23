import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  user$: Observable<firebase.User>
  user: EventEmitter<any> = new EventEmitter<any>()

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.user$ = this.afAuth.authState
  }

  login (email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  logout () {
    this.afAuth.auth.signOut()
  }

  register ({ email, password, firstName, lastName, position }) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const userObject: User = { email, firstName, lastName, position }
        this.update(res.uid, userObject)
        this.router.navigateByUrl('/app')
      })
  }

  update (uid, { email, firstName, lastName, position }) {
    const userObject: User = { email, firstName, lastName, position }
    this.db.object('/users/' + uid).update(userObject)
    this.user.emit(userObject)
  }

  fetch (uid: string) {
    this.db.object('/users/' + uid)
      .valueChanges()
      .subscribe(user => {
        this.user.emit(user)
      })
  }

  getAll () {
    return this.db.list('/users')
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      })
  }
}
