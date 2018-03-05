import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private _authService:AuthService) { }

  ngOnInit() {
  }

  details: any = {};

  createPost(){
    this.details.userCreated = this._authService.getUser();
    this._authService.createPost(this.details);
  }

}
