import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TeamService } from '../services/team.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../models/user';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {
  userList: User[] = []
  teamMembersId = []
  subscribtion: Subscription
  loggedUserId: string

  constructor(private userService: UserService, private teamService: TeamService) {
    this.subscribtion = this.userService.userAuth$
      .switchMap((loggedUser) => {
        this.loggedUserId = loggedUser.uid
        return this.userService.userList$
      })
      .switchMap((userList: User[]) => {
        this.userList = userList.filter((user) => user.key !== this.loggedUserId)
        return this.teamService.teamList$
      }).subscribe((list: string[]) => {
        this.teamMembersId = list
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe()
  }

  submit (f) {
    this.teamService.add(f.newTeamMember)
  }

  getUserWithId(id): User {
    return this.userList.find((user: User) => user.key === id)
  }

  deleteUser(userId: string): void {
    this.teamService.delete(userId)
  }
}
