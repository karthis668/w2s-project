import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecureloginpgauthGuard implements CanActivate {
  constructor(
    public router: Router
  ){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedin = localStorage.getItem('isloggedin');
    let authentication;
    if(isLoggedin == 'true'){
      authentication = true;
    }
    else{
      authentication = false;
    }
    if(!authentication) {
      // window.alert('Access Denied, Login is Required to Access This Page!');
      this.router.navigate(['/login']);
    }
    return true;
  }

}
