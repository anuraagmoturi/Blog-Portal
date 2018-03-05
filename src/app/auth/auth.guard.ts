import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService:AuthService, private _router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this._authService.fetchToken()){
      console.log("in guard user token : "+this._authService.fetchToken());
      return true;
    }else{
      this._router.navigate(['/logIn']);
      return false;
    }
  }
}
