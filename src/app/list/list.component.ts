import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private _authService: AuthService) { }
 posts : any[];
  ngOnInit() {
    this._authService.getPost();
    this._authService.subObj.subscribe((details:any[])=>{
      this.posts = details;
    });
  }





}
