import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Subject} from "rxjs/Subject";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  navSubObj = new Subject();

  subObj = new Subject();
  postById = new Subject();

  flagobj:any={flag:false};

  constructor(private _http: HttpClient, private _cookieService: CookieService, private _router:Router) {}

  sendUser(details){
   // console.log("inside send user");
    this._http.post('http://localhost:2000/sendUser', details)
      .subscribe((data: any) =>{
       // console.log(data.flag);

      });
  }

  logInCheck(details){
    this._http.post('http://localhost:2000/logInCheck',details)
      .subscribe((data: any) =>{
       // console.log(data);
        if(data.flag){
          this._cookieService.set('loggedIn',details.username);
          console.log("cookie set");
          this._cookieService.set('m_token', data.token);

          //this.flagobj.flag=true;
          this.navSubObj.next(false);

          this._router.navigate(['/list']);

        }else {
          console.log("Log in failed");
        }
      });
  }

  getUser(){
    return this._cookieService.get("loggedIn");
  }

  fetchToken(){
    return this._cookieService.get("m_token");
  }

  createPost(details){
    //console.log("inside create post");
    this._http.post('http://localhost:2000/createPost', details)
      .subscribe((data: any) =>{
       // console.log(data.flag);

      });
  }

  getPost(){
    var posts=[];
    this._http.get('http://localhost:2000/getPost')
      .subscribe((data:any)=>{
      //  console.log(data);
        this.subObj.next(data);
        posts= data;
      });

  }

   like(post_id,Cuser){

    console.log(Cuser);
     this._http.post('http://localhost:2000/likepost', {post_id:post_id,user:Cuser})
      .subscribe((data: any) =>{
        console.log(data);

      });
  }

   unlike(post_id,Cuser){
     this._http.post('http://localhost:2000/unlike', {post_id:post_id,user:Cuser})
      .subscribe((data: any) =>{
        console.log(data);

      });
  }

  comment(post_id,commentObj){
    this._http.post('http://localhost:2000/comment',{post_id:post_id,comment:commentObj} )
      .subscribe((data: any) =>{
        console.log(data);

      });
  }


  getPostById(post_id){
    var post;
    console.log(post_id);
    this._http.post('http://localhost:2000/getPostById',{post_id:post_id })
      .subscribe((data: any) =>{
        console.log(data);
        post = data[0];
        this.postById.next(post);
      });
    return this.postById;
  }




}
