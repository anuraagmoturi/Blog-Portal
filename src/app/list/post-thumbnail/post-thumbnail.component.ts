import { Component, OnInit,Input } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-post-thumbnail',
  templateUrl: './post-thumbnail.component.html',
  styleUrls: ['./post-thumbnail.component.css']
})
export class PostThumbnailComponent implements OnInit {

  constructor(private _authService:AuthService) { }

  @Input() inPost:any;

  post:any = {};
  likes: number =0;
  disableBtn: boolean;
  flag:boolean;
  likeSec:boolean;
  comSec:boolean;
  commentDes:any={};
  currentUser:String;


  ngOnInit() {
    this.post = this.inPost;
    if(this.post.likes.length>0){
      this.likes = this.post.likes.length;
    }

     this.likeSec=false;
    this.comSec = false;

    if(this.post.likes.indexOf(this._authService.getUser()) >-1 ){
     this.flag = false;
    }else{
      this.flag = true;
    }

    this.currentUser=this._authService.getUser()


  }

   like(){

    console.log(this.post.title);
     this._authService.like(this.post._id,this.currentUser);
    this.changeButton();
    this.post.likes.push(this.currentUser);
    this.likes = this.likes +1;
  }

  changeButton(){
    this.flag=!this.flag
  }

   unlike(){
    this._authService.unlike(this.post._id,this.currentUser);
    this.changeButton();
    this.post.likes.splice(this.post.likes.indexOf(this.currentUser),1);
    this.likes = this.likes -1;
  }

  viewLikes(event){
     event.stopPropagation();
    this.likeSec=!this.likeSec;
     console.log("event prop stopped");

     console.log(this.post.likes.toString());

  }


  comment(){
    this.commentDes.userCommented = this.currentUser;
    this._authService.comment(this.post._id,this.commentDes);
    this.post.comments.push(this.commentDes);
  }

  viewComments(event){
   // event.stopPropagation();
    this.comSec=!this.comSec;



  }





}
