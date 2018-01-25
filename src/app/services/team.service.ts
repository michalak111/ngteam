import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TeamService {
  teamList$: BehaviorSubject<string[]> = new BehaviorSubject([])
  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.getAll()
  }

  add (newMemberId: string): void {
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

  delete (memberId: string): void {
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
        .subscribe((response: string[]) => {
          if (response) {
            this.teamList$.next(Object.keys(response))
          } else {
            this.teamList$.next([])
          }
        })
    })
  }
}
