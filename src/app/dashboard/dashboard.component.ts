import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { users } from '../services/websql.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = true;
  role!:any;
  admin!:boolean;
  developer!:boolean;
  constructor(
    public apiservice: ApiService,
    public userdb : users,
    private headercomponent: HeaderComponent,
    private authservice: AuthService

  ) {

   }

  ngOnInit(): void {
    let loginStatus = this.authservice.isuserLoggedin();
    // alert("dash");
    // alert(loginStatus);
    this.headercomponent.getloginStatus();
    this.role = this.authservice.getrole();
    // console.log(this.role);
    if(this.role == '"admin"'){
      this.admin = true;
      this.developer = false;
    }
    else if(this.role == '"developer"'){
      this.admin = false;
      this.developer = true;
    }
  }



}


