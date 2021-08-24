import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../services/websql.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
  userName: any;
  role: any;
  phone: any;
  email: any;
  userid = Number(localStorage.getItem('user_id'));

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private userdb : users
  ) {

  }

  ngOnInit() {
    this.getUseretails();
  }

  async getUseretails(){
    let userdata = await this.userdb.getUsrWithId(this.userid).then(res => {
      return res;
    });
    console.log("+++");
    console.log(userdata);
    console.log("__________________________");
    this.userName = userdata.user_name;
    this.role = userdata.role;
    this.phone = userdata.phone;
    this.email = userdata.email;
  }

}
