import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';

@Component({
  template: ''
})
export class AuthRedirectComponent implements OnDestroy {
  subscription: Subscription
  constructor (userService: UserService, router: Router) {
    this.subscription = userService.userAuth$.subscribe((user) => {
      if (user) {
        router.navigateByUrl('/app')
      }
    })
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe()
  }
}
