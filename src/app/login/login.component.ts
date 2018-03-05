import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService:AuthService) { }

  ngOnInit() {
  }

  details: any = {};

  login(){
    this._authService.logInCheck(this.details);
  }

}
