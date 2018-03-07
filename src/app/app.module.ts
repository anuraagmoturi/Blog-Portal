import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";



import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import {AuthService} from "./auth/auth.service";
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { PostThumbnailComponent } from './list/post-thumbnail/post-thumbnail.component';
import {AuthGuard} from "./auth/auth.guard";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { ViewPostComponent } from './list/view-post/view-post.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignupComponent,
    LoginComponent,
    CreateComponent,
    ListComponent,
    PostThumbnailComponent,
    ViewPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path:'signUp', component: SignupComponent },
      { path:'', component: LoginComponent },
      { path:'create', component: CreateComponent,
        canActivate:[AuthGuard]
      },
      { path:'list', component: ListComponent,
        canActivate:[AuthGuard]
      },
      { path:'post/:id', component: ViewPostComponent,
        canActivate:[AuthGuard]
      },
    ])
  ],
  providers: [AuthService,CookieService,AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
