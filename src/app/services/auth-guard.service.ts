import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private user: UserService, private router: Router) { }

  canActivate (route, state: RouterStateSnapshot) {
    return this.user.user$.map(user => {
      if (user) {
        this.user.fetch(user.uid)
        return true
      }
      this.router.navigateByUrl('/')
      return false
    })
  }
}
