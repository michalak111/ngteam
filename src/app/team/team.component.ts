import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TeamService } from '../services/team.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {
  userList
  teamList = []
  subscribe: Subscription

  constructor(private userService: UserService, private teamService: TeamService) {
    this.userList = this.userService.getAll()
    this.teamService.getAll()
    this.subscribe = this.teamService.teamList$.subscribe(team => this.teamList = team)
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscribe.unsubscribe()
  }

  submit (f) {
    this.teamService.add(f.newTeamMember)
  }
}
