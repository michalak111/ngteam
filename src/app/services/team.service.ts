import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable()
export class TeamService {
  teamList$: EventEmitter<any> = new EventEmitter<any>()
  constructor(private db: AngularFireDatabase, private userService: UserService) { }

  add (newMemberId) {
    this.userService.user$.subscribe(res => {
      this.db.object('/team/' + res.uid)
        .update({
          [newMemberId] : true
        })
    })
  }

  getSingle (uid: string) {
    return this.db.object('/users/' + uid)
      .valueChanges()
  }

  getAll () {
    this.userService.user$.subscribe(res => {
      this.db.object('/team/' + res.uid)
        .valueChanges()
        .subscribe((response) => {
          if (response) {
            this.teamList$.emit(Object.keys(response))
          }
        })
    })
  }
}
