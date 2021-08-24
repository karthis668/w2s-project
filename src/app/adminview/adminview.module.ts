import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminviewRoutingModule } from './adminview-routing.module';
import { AdminviewComponent } from './adminview.component';


@NgModule({
  declarations: [
    AdminviewComponent
  ],
  imports: [
    CommonModule,
    AdminviewRoutingModule
  ],
  exports:[AdminviewComponent]
})
export class AdminviewModule { }
