import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  userAuth$: Observable<firebase.User>
  user$: EventEmitter<User> = new EventEmitter<User>()
  userList$: BehaviorSubject<User[]> = new BehaviorSubject([])

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.userAuth$ = this.afAuth.authState
    this.getAll()
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
    this.user$.emit(userObject)
  }

  fetch (uid: string) {
    this.db.object('/users/' + uid)
      .valueChanges()
      .subscribe((user: User) => {
        this.user$.emit(user)
      })
  }

  getAll () {
    this.db.list('/users')
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
      })
      .subscribe((userList: User[]) => this.userList$.next(userList))
  }
}
