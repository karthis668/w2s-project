import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperviewRoutingModule } from './developerview-routing.module';
import { DeveloperviewComponent } from './developerview.component';


@NgModule({
  declarations: [
    DeveloperviewComponent
  ],
  imports: [
    CommonModule,
    DeveloperviewRoutingModule
  ],
  exports:[DeveloperviewComponent]
})
export class DeveloperviewModule { }
