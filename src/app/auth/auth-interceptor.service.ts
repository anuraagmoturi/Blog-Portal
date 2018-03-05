import { Injectable } from '@angular/core';
import {HttpHeaders, HttpInterceptor} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private _authService:AuthService) { }

  intercept(req,next){
    console.log('in interceptor');

    var authRequest = req.clone({
      headers: new HttpHeaders().set('authorization',this._authService.fetchToken())
    });

    return next.handle(authRequest);
  }

}
