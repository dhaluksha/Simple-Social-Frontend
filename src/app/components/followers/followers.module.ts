import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowersRoutingModule } from './followers-routing.module';
import { FollowersComponent } from './followers.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FollowersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FollowersRoutingModule
  ]
})
export class FollowersModule { }
