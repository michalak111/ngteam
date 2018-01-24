import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/user';


@Component({
  selector: 'app-team-user-card',
  templateUrl: './team-user-card.component.html',
  styleUrls: ['./team-user-card.component.css']
})
export class TeamUserCardComponent implements OnInit {
  @Input('user') user: User
  @Output() deleteTeamMember = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  deleteUser(): void {
    this.deleteTeamMember.emit(this.user.key)
  }
}
