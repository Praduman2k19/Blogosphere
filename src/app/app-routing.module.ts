import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BlogsComponent } from './blogs/blogs.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ViewComponent } from './view/view.component';


const routes:Routes=[
  { path: '' , component :HomeComponent, pathMatch: 'full' },
  { path: 'myblogs', component :BlogsComponent,pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'blogs', component : MyblogsComponent ,pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'profile/:id', component :ProfileComponent,pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'edit-profile/:userId', component :EditProfileComponent,pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'view/:postId', component :ViewComponent,pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component :NotFoundComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

