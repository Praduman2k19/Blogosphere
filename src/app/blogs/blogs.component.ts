import { Component, OnInit, Input,Output } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  user:any={};
  posts:any[]=[];
  userId:any;
  photoUrl:any;
  data:any
  constructor() {
    this.user=firebase.auth().currentUser;
    firebase.firestore().collection("users").doc(this.user?.uid).get().then((documentSnapshot)=>{
      this.data=documentSnapshot.data();
      this.photoUrl=this.data.photoURL;
      // console.log(this.user);
      this.getPost();
    })
    // console.log(this.user);
    
  }
  getPost()
  {
    //get the list of posts
    firebase.firestore().collection("posts")
    .orderBy("createed","desc")
    .where("owner","==",this.user.uid)
    .get().then((querySnapshot)=>{
      // console.log(this.user.uid);
      this.posts=querySnapshot.docs;
    }).catch((err)=>{
      console.log(err);
    })
  }
  onDelete(){
    this.posts=[];
    this.getPost();
  }
  ngOnInit(): void {
  }

}
