import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesRoutingModule } from './images-routing.module';
import { ImagesComponent } from './images.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ImagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImagesRoutingModule
  ]
})
export class ImagesModule { }
