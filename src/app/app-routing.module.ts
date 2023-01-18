import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/auth-tabs/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'streams',
    loadChildren: () => import('./components/streams/streams.module').then(m => m.StreamsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    loadChildren: () => import('./components/people/people.module').then(m => m.PeopleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people/following',
    loadChildren: () => import('./components/following/following.module').then(m => m.FollowingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people/followers',
    loadChildren: () => import('./components/followers/followers.module').then(m => m.FollowersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./components/comments/comments.module').then(m => m.CommentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./components/notifications/notifications.module').then(m => m.NotificationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: ':name',
    loadChildren: () => import('./components/view-user/view-user.module').then(m => m.ViewUserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'images/:name',
    loadChildren: () => import('./components/images/images.module').then(m => m.ImagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account/password',
    loadChildren: () => import('./components/change-password/change-password.module').then(m => m.ChangePasswordModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:name',
    loadChildren: () => import('./components/chat/chat.module').then(m => m.ChatModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
