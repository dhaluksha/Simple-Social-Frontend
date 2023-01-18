import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUserRoutingModule } from './view-user-routing.module';
import { ViewUserComponent } from './view-user.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ViewUserRoutingModule
  ]
})
export class ViewUserModule { }
