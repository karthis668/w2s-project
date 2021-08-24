import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermanagementRoutingModule } from './usermanagement-routing.module';
import { UsermanagementComponent } from './usermanagement.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from '../components/loader/loader.component';
import { SignupModule } from '../signup/signup.module';
import { SignupComponent } from '../signup/signup.component';



@NgModule({
  declarations: [
    UsermanagementComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    UsermanagementRoutingModule,
    MatProgressSpinnerModule,
    SignupModule
  ],
  exports:[UsermanagementComponent],
  providers:[SignupComponent],

})
export class UsermanagementModule { }
