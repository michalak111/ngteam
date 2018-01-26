import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthRedirectComponent } from '../auth-redirect/AuthRedirectComponent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AuthRedirectComponent {

  constructor(private userService: UserService, private router: Router) {
    super(userService, router)
  }

  register (user) {
    this.userService.register(user)
  }
}
