import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRedirectComponent } from '../auth-redirect/AuthRedirectComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AuthRedirectComponent {
  constructor(private userService: UserService, private router: Router) {
    super(userService, router)
  }

  login (f: FormGroupDirective) {
    const {email, password} = f.value
    this.userService.login(email, password)
      .then(() => {
        this.router.navigateByUrl('/app')
      })
      .catch((err) => {
        f.form.setErrors({message: err.message})
      })
  }
}
