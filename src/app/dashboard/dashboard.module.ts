import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminviewModule } from '../adminview/adminview.module';
import { DeveloperviewModule } from '../developerview/developerview.module';
import { AdminviewComponent } from '../adminview/adminview.component';
import { DeveloperviewComponent } from '../developerview/developerview.component';




@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AdminviewModule,
    DeveloperviewModule
  ],

})
export class DashboardModule { }
