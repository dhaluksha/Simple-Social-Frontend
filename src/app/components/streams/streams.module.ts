import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamsRoutingModule } from './streams-routing.module';
import { StreamsComponent } from './streams.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StreamsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StreamsRoutingModule
  ]
})
export class StreamsModule { }
