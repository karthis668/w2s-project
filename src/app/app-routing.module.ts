import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolebasedauthGuard } from './guards/rolebasedauth.guard';
import { SecureloginpgauthGuard } from './guards/secureloginpgauth.guard';
import { SecureotherpgsauthGuard } from './guards/secureotherpgsauth.guard';

const routes: Routes = [
  {path: '',pathMatch: 'full',redirectTo :'login'},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[SecureloginpgauthGuard] },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),canActivate:[SecureotherpgsauthGuard] },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule),canActivate:[SecureotherpgsauthGuard]},
  { path: 'myaccount', loadChildren: () => import('./myaccount/myaccount.module').then(m => m.MyaccountModule),canActivate:[SecureloginpgauthGuard] },
  { path: 'userlist', loadChildren: () => import('./usermanagement/usermanagement.module').then(m => m.UsermanagementModule),canActivate:[SecureloginpgauthGuard,RolebasedauthGuard] },
  { path: 'adminview', loadChildren: () => import('./adminview/adminview.module').then(m => m.AdminviewModule),canActivate:[SecureloginpgauthGuard] },
  { path: 'developerview', loadChildren: () => import('./developerview/developerview.module').then(m => m.DeveloperviewModule),canActivate:[SecureloginpgauthGuard] },
  { path:'**', redirectTo :'login'}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
