import {Component, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

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

  ngOnInit(): void {
  }
}
