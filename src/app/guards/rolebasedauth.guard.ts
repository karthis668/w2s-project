import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolebasedauthGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    public router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     let role = this.authservice.getrole();

     if(role == '"admin"'){
       return true;
     }
     alert("You are not allowed to access this page");
    return false;
  }

}
