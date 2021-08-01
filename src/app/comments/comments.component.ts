import { Component, OnInit, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comment:string="";
  loggedIn:boolean=true;
  comments:any[]=[];
  id:any;
  @Input("postId") postId:string | undefined
  constructor() { 
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.loggedIn=true;
      }
      else{
        this.loggedIn=false;
      }
    })
  }
  
  postComment(){
    if(this.comment.length<5){
      return;
    }
    firebase.firestore().collection("comments").add({
      text:this.comment,
      post:this.postId,
      owner:firebase.auth().currentUser?.uid,
      ownerName:firebase.auth().currentUser?.displayName,
      created:firebase.firestore.FieldValue.serverTimestamp()
    }).then((data)=>{
      console.log("Comment is saved");
      this.comments=[];
      this.getComment();
    }).catch((err)=>{
      console.log(err);
    })
  }
  getComment(){
    this.comments=[];
    firebase.firestore().collection("comments")
    .where("post","==",this.postId)
    .orderBy("created","desc")
    .get().then((data)=>{
      console.log("Postid:"+this.postId )
      data.docs.forEach((commentRef)=>{
        this.comments.push(commentRef.data());
      })
    })
  }
  ngOnInit(): void {
    this.getComment();
   }

}
