import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  details:any = {};

  signUp(){
    this._authService.sendUser(this.details);
  }
}
