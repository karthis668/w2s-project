import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecureotherpgsauthGuard implements CanActivate {
  constructor(
    public router: Router
  ){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let authentication;
      if(localStorage.getItem('isloggedin') === 'true'){
       authentication = true;
      }
      else{
        authentication = false;
      }
      if(authentication) {
        // window.alert('You are already signed in, access denied! for login page');
        this.router.navigate(['/dashboard']);
     }
    return true;
  }

}
