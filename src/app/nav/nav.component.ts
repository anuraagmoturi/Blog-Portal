import {Component, OnChanges, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnChanges {

  constructor(private _cookieService: CookieService, private _authService: AuthService) { }

  flag: any={};
  user: any;

  ngOnInit() {
     this.user = this._cookieService.get("loggedIn");
     console.log(this.user);
    // if(this.user == ''){
    //   console.log('if');
    //   this.flag == false;
    // }else{
    //   console.log('else');
    //   this.flag == true;
    // }

    this._authService.subObj.subscribe((flagObj)=> {
      this.flag = flagObj;
    });


  }
  ngOnChanges(){
    this.user = this._cookieService.get("loggedIn");
    console.log(this.user);
    if(this.user == ''){
      console.log('if');
      this.flag == false;
    }else{
      console.log('else');
      this.flag == true;
    }
}

}
