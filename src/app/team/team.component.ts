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
  subscribtions: Subscription[] = []

  constructor(private userService: UserService, private teamService: TeamService) {
    this.subscribtions.push(this.userService.userList$.subscribe(list => this.userList = list))
    this.subscribtions.push(this.teamService.teamList$.subscribe(list => this.teamMembersId = list))
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscribtions.map((s: Subscription) => s.unsubscribe())
  }

  submit (f) {
    this.teamService.add(f.newTeamMember)
  }

  getUserWithId(id): User {
    return this.userList.find((user: User) => user.key === id)
  }
}
