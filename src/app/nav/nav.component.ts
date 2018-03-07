import {Component, OnChanges, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnChanges {

  flag: any={};
  user: any;
  bool:any=true;
  constructor(private _cookieService: CookieService, private _authService: AuthService, private _router:Router) {
    this._authService.navSubObj.subscribe(data=>{
     // console.log(data);
      this.bool = data;
     // console.log(this.bool);
      console.log("const");
    });

    if(this._authService.getUser() !== ''){
      console.log("if");
      this.bool = false;
    }
  }


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




  logOut(){
    this._router.navigate(['/logIn']);
    this._cookieService.deleteAll();

    this.bool = true;
  }



}
