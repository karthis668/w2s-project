import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{


  constructor(
    private loginservice: LoginComponent,
    private router: Router,
    private authservice: AuthService,
  ) { }
  isLoggedIn!: boolean;
  resLoggedIn!: any;

  ngOnInit(): void {

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    this.authservice.loginStatus.next(false);
    this.isLoggedIn = false;
    this.getloginStatus();
  }

  getloginStatus(){
    // alert(456);
    let status  = this.authservice.isuserLoggedin();
    if(status == true){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  //  alert(this.isLoggedIn);
   this.ngOnInit();
    // this.logout();
  }

}
