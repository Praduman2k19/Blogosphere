import { Component, OnInit } from '@angular/core';
import  firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  message:string="";
  user:any={};
  userId: any;

  route: any;
  photoUrl: string="https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png";

  constructor(location: Location, router: Router) {
    // this.userId= localStorage.getItem('auth_token')
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path();
      }
      // console.log(this.route.substring(14,this.route.length))
      this.userId=this.route.substring(14,this.route.length);
    });
  }

  getProfile(){
    // this.userId=firebase.auth().currentUser?.uid;
    // console.log(this.userId +"abc");
    // console.log(firebase.auth().currentUser)
    firebase.firestore()?.collection("users")?.doc(this.userId)?.get()?.then((res)=>{
      this.user=res?.data();
      this.user.displayName=this.user?.firstName+" "+this.user?.lastName;
      this.userId=res?.id;
      this.user.photoUrl=this.user?.photoURL;
      console.log(this.user);
      this.message="";
    },err=>{
      console.log(err);

    })

  }
  update(){
    this.message="Updating Profile ...";
    firebase.auth().currentUser?.updateProfile({
      displayName:this.user?.displayName,photoURL :this.photoUrl
    }).then(()=>{
      firebase.firestore()?.collection("users")?.doc(this.userId)?.update({
        firstName:this.user?.displayName?.split(' ')[0],
        lastName:this.user?.displayName?.split(' ')[1],
        hobbies:this.user?.hobbies,
        photoURL:this.user?.photoUrl,
        interests:this.user?.interests,
        bio:this.user?.bio
      }).then(()=>{
        this.message="Profile updated Successfully.";
        this.getProfile();
      },err=>{
        console.log(err);
      })
    })
  }

  ngOnInit(): void {
    this.getProfile();
  }

}
