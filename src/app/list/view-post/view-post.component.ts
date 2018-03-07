import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  id: any;
  post:any;
  constructor(private _activatedRoute:ActivatedRoute, private _authService:AuthService) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this._authService.getPostById(this.id).subscribe((post:any[])=>{
      this.post = post;
      console.log(this.post);
    });
  }

}
