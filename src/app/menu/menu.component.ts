import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  ngOnInit(){}
  id:any;
  loggedIn:any=true;

  constructor()
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
 }

 loginSignup:boolean=true;
 loginSignupchanged()
 {
   this.loginSignup=!this.loginSignup;
 }

  logout()
  {
    firebase.auth().signOut();
  }

}

