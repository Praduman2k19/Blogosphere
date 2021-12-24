
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(){}
  id:any;
  loggedIn:any=false;

  constructor(public router:Router,private toastrService:ToastrService)
  {
    const user=firebase.auth().currentUser;

    if(user){
      this.loggedIn=true;
      console.log(user+"kj")
    }
    else{
      this.loggedIn=false;
      console.log(user+"kjk ")
    }
    firebase.auth().onAuthStateChanged((user)=>{
      this.id=user?.uid;
      if(user){
        this.loggedIn=true;
      }
      else{
        this.loggedIn=false;
      }
   })

   if(localStorage.getItem('auth_token')!="")
    this.loggedIn=true;
   else
    this.loggedIn=false;
 }


 loginSignup:boolean=true;
 loginSignupchanged()
 {
   this.loginSignup=!this.loginSignup;
 }

  logout()
  {
    this.toastrService.success("You have been logged out successfully.")
    firebase.auth().signOut();
    localStorage.removeItem('auth_token')
    this.router.navigateByUrl('')
  }

}
