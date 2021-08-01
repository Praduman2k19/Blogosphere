import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import  firebase from "firebase/app";
import { NgxEditorModule } from 'ngx-editor';
import 'firebase/auth';
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { CreateComponent } from './create/create.component';


import { AuthService } from './auth.service';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { CommentsComponent } from './comments/comments.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FooterComponent } from './footer/footer.component';
import { BlogsComponent } from './blogs/blogs.component';
var config = {
  apiKey: "AIzaSyADrC3zLxNbgw1TSp-KfXMrb8qS0wE9ujY",
  authDomain: "scribeapp-80421.firebaseapp.com",
  projectId: "scribeapp-80421",
  storageBucket: "scribeapp-80421.appspot.com",
  messagingSenderId: "122065497328",
  appId: "1:122065497328:web:b77d8b1cace9de514f2635",
  measurementId: "G-832CRDRS1B"
};

firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MenuComponent,
    ProfileComponent,
    MyblogsComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentsComponent,
    EditProfileComponent,
    FooterComponent,
    BlogsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    AppRoutingModule, 
    NgxEditorModule, 
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
