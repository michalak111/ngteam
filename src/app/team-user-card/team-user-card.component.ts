import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-team-user-card',
  templateUrl: './team-user-card.component.html',
  styleUrls: ['./team-user-card.component.css']
})
export class TeamUserCardComponent implements OnInit, OnDestroy {
  @Input('user') userId
  user
  subscribe: Subscription
  constructor(private teamService: TeamService, private userService: UserService) {}

  ngOnInit() {
    // TODO refactor - get form all user list
    this.subscribe = this.teamService.getSingle(this.userId)
      .subscribe(user => {
        this.user = user
      })
  }

  ngOnDestroy () {
    this.subscribe.unsubscribe()
  }

}
