import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TeamService } from '../services/team.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../models/user';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {
  userList: User[] = []
  teamMembersId: string[] = []
  subscribtion: Subscription

  constructor(private userService: UserService, private teamService: TeamService) {
    this.subscribtion = combineLatest(
      this.userService.userAuth$,
      this.userService.userList$,
      this.teamService.teamList$
    )
      .subscribe(([userAuth, userList, teamList]) => {
        this.userList = userList.filter((user: User) => user.key !== userAuth.uid)
        this.teamMembersId = teamList
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
