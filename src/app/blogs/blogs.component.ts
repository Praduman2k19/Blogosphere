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
  photoUrl:string="https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png";
  data:any
  constructor() {
    this.user=firebase.auth()?.currentUser;
  }
  ngOnInit(): void {
    if(this.user)
    firebase.firestore()?.collection("users")?.doc(this.user?.uid)?.get()?.then((res)=>{
    this.data=res?.data();
    this.photoUrl=this.data?.photoURL;
    // console.log(this.user);
    this.getPost();
  },err=>{
    console.log(err)
  })
  // console.log(this.user);
  }
  getPost()
  {
    //get the list of posts
    firebase.firestore()?.collection("posts")?.orderBy("createed","desc")?.where("owner","==",this.user?.uid)?.get()?.then((res)=>{
      // console.log(this.user.uid);
      this.posts=res?.docs;
    },err=>{
      console.log(err);
    })
  }
  onDelete(){
    this.posts=[];
    this.getPost();
  }


}
