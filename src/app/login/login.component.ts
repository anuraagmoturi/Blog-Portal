import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginSub = new Subject();
  constructor(private _authService:AuthService) {

  }

  ngOnInit() {

  }

  details: any = {};

  login(){
    this._authService.logInCheck(this.details);
    this.loginSub.next({flag:true})
    //return this.loginSub;
  }

}
