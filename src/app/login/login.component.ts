import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import data from '../userdata.json';

import { MatSnackBar } from '@angular/material/snack-bar';
import { users } from '../services/websql.service';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup ;
  loading = false;
  submitted = false;
  isLoggedin = false;
  role!: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      private userdb : users,
      private authservice : AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email:  new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: ['', Validators.required]
  });

  }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  async onSubmit() {

    this.submitted = true;
    const formvalue = this.loginForm.value;
    console.log(formvalue);

    if (formvalue.email != '' && formvalue.password != '') {
      let userdata = await this.userdb.getUsrWithEmail(formvalue.email, formvalue.password).then(res => {
        return res;
      });
      console.log(userdata);

      if (userdata.email !== formvalue.email && userdata.password !== formvalue.password) {
        this.snackBar.open("Email Or Password Incorrect", 'close', {
          duration: 3000
        });
      }
      else {
        // const mydetails = myData[index];
        // console.log(mydetails);
        localStorage.setItem("user_id", JSON.stringify(userdata.id));

        this.router.navigate(['/dashboard']);
        this.isLoggedin = true;
        this.role = userdata.role;
        localStorage.setItem("isloggedin", JSON.stringify(this.isLoggedin));
        localStorage.setItem("role", JSON.stringify(this.role));
        this.authservice.loginStatus.next(this.isLoggedin);
        this.snackBar.open("Logged in successfully", 'close', {
          duration: 3000
        });
      }
    }
    else {
      this.snackBar.open("Please enter the required fields", 'close', {
        duration: 3000
      });
    }

  }


}
