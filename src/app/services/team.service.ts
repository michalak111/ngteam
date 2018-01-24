import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';

@Injectable()
export class TeamService {
  teamList$: EventEmitter<any> = new EventEmitter<any>()
  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.getAll()
  }

  add (newMemberId) {
    this.userService.userAuth$.subscribe(res => {
      this.db.object('/team/' + res.uid)
        .update({
          [newMemberId] : true
        })
        .then(() => {
          this.getAll()
        })
    })
  }

  delete (memberId) {
    this.userService.userAuth$.subscribe(res => {
      this.db.object('/team/' + res.uid + '/' + memberId)
        .remove()
        .then(() => {
          this.getAll()
        })
    })
  }

  getSingle (uid: string) {
    return this.db.object('/users/' + uid)
      .valueChanges()
  }

  getAll () {
    this.userService.userAuth$.subscribe(res => {
      this.db.object('/team/' + res.uid)
        .valueChanges()
        .subscribe((response) => {
          if (response) {
            this.teamList$.emit(Object.keys(response))
          } else {
            this.teamList$.emit([])
          }
        })
    })
  }
}
