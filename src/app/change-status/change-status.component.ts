import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {}

  setAvalible() {
    this.userService.status({text: 'I am avalible'})
  }
}
