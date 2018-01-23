import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  user: User
  subscribe: Subscription
  constructor(private userService: UserService, private router: Router) {
    this.subscribe = this.userService.user.subscribe(user => this.user = user)
  }

  ngOnInit() {}

  ngOnDestroy () {
    this.subscribe.unsubscribe()
  }

  submit ({firstName, lastName, position}) {
    this.userService.user$.subscribe(res => {
      this.userService.update(res.uid, {email: res.email, firstName, lastName, position})
      this.router.navigateByUrl('/app/profile')
    })
  }

}
