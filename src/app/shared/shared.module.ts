import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { SideComponent } from '../components/side/side.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { TokenInterceptor } from '../services/token-interceptor';

@NgModule({
  declarations: [
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    TopStreamsComponent,
  ],
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    FileUploadModule
  ],
  exports: [
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    TopStreamsComponent,
    PostsComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    FileUploadModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class SharedModule {}
