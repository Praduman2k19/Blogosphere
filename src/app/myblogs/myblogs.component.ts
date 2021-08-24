import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input,Output } from '@angular/core';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  user:any={};
  posts:any[]=[];
  userId:any;
  photoUrl:any;
  data:any
  constructor() {
    // firebase.firestore().settings({
    //   timestampsInsnapshots:true
    // });

    this.user=firebase.auth().currentUser;
    firebase.firestore().collection("users").doc(this.user.uid).get().then((documentSnapshot)=>{
      this.data=documentSnapshot.data();
      this.photoUrl=this.data.photoURL;
      // console.log(this.user);
    })


    // console.log(this.user);
    this.getPost();
  }
  getPost()
  {
    //get the list of posts
    firebase.firestore().collection("posts")
    .orderBy("createed","desc")
    .get().then((querySnapshot)=>{
      console.log(querySnapshot.docs);
      this.posts=querySnapshot.docs;
    }).catch((err)=>{
      console.log(err);
    })
  }
  onPostCreated()
  {
    //refresh the list of posts
    this.posts=[];
    this.getPost();
  }
  onDelete(){
    this.posts=[];
    this.getPost();
  }
  ngOnInit(): void {
  }


}
