import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BlogsComponent } from './blogs/blogs.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewComponent } from './view/view.component';

const routes:Routes=[
  {
    path: '' , component :HomeComponent
  },
  {
    path: 'myblogs', component :BlogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blogs', component : MyblogsComponent ,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id', component :ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile/:userId', component :EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view/:postId', component :ViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo:''
  }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

