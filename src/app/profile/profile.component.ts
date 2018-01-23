import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User
  subscribe: Subscription
  constructor(private userService: UserService) {
    this.subscribe = this.userService.user.subscribe(user => this.user = user)
  }

  ngOnInit() {}

  ngOnDestroy () {
    this.subscribe.unsubscribe()
  }
}
