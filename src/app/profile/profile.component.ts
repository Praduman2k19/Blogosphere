import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any={};
  posts:any[]=[];
  currentId:any;
  photoURL:string="https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
  constructor(public activatedRoute:ActivatedRoute) {
    let id=activatedRoute.snapshot.paramMap.get('id');
    // console.log(id);
    this.getProfile(id);
    this.getUserPosts(id);


   }

   getProfile(id:any){
    //  firebase.firestore().settings({
    //    timestampsInsnapshots:true
    //  })
    // console.log(id);
    firebase.firestore().collection("users").doc(id).get().then((res)=>{
      this.user=res.data();
      this.user.displayName=this.user.firstName+" "+this.user.lastName;
      this.user.id=res.id;
      this.photoURL=this.user?.photoURL;
      this.user.hobbies=this.user.hobbies.split(',');

      // console.log(this.user);
    }).catch((err)=>{
      console.log(err);
    })
  }

  getUserPosts(id:any){
    firebase.firestore().collection("posts")
    .where("owner","==",id).get().then((data)=>{
      this.posts=data.docs;
    })
  }
  ngOnInit() {
    this.currentId=firebase.auth().currentUser?.uid;
    // console.log(this.currentId);
  }


}
