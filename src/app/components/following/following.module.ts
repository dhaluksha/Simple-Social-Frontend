import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowingRoutingModule } from './following-routing.module';
import { FollowingComponent } from './following.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FollowingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FollowingRoutingModule
  ]
})
export class FollowingModule { }
