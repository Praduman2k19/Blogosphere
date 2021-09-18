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
  photoUrl:string="https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png";
  data:any
  constructor() {
    // firebase.firestore().settings({
    //   timestampsInsnapshots:true
    // });
    this.user=firebase.auth().currentUser;
    firebase.firestore().collection("users")?.doc(this.user?.uid)?.get()?.then((res)=>{
      this.data=res?.data();
      this.photoUrl=this.data?.photoURL;
      // console.log(this.user);
    },err=>{
      console.log(err);
    })
  }
  ngOnInit(): void {
    this.getPost();
  }

  getPost()
  {
    //get the list of posts
    firebase.firestore()?.collection("posts")?.orderBy("createed","desc")?.get()?.then((res)=>{
      console.log(res?.docs);
      this.posts=res?.docs;
    },err=>{
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



}
