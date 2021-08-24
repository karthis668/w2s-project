import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginStatus = new BehaviorSubject<any>(false);

  constructor(
    // private loginservices: LoginComponent
  ) { }

  isuserLoggedin(){
    var loginstatus;
    this.loginStatus.subscribe( res =>{
      console.log("{{{{{{{{{{{{{{{{{{",res);
      loginstatus = res;
    })
    return !!loginstatus;
  }


  getrole(){
    let role = localStorage.getItem('role');
    return role;
  }
}
