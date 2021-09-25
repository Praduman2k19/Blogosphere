import { Component, OnInit, Input,Output } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  uid:any={};
  posts:any[]=[];
  userId:any;
  photoUrl:string="https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png";
  data:any
  constructor(public toastrService: ToastrService) {
    this.uid=localStorage.getItem('auth_token')
  }
  ngOnInit(): void {
    firebase.firestore()?.collection("users")?.doc(this.uid)?.get()?.then((res)=>{
      this.data=res?.data();
      this.photoUrl=this.data?.photoURL
      console.log(this.data)
      this.getPost();
    },err=>{
      console.log(err)
    })
  }

  getPost()
  {
    //get the list of posts
    firebase.firestore()?.collection("posts")?.orderBy("createed","desc")?.where("owner","==",this.uid)?.get()?.then((res)=>{
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
