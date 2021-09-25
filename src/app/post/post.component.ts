import { Component, OnInit, Input, Output } from '@angular/core';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post :any;
  @Output("onDelete") onDelete=new EventEmitter();
  postData:any={};
  user :any={};

  halfContent:string="";
  posts: any;

  constructor(private toastrService:ToastrService){}

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.postData=this.post.data();
    this.user=firebase.auth().currentUser;
    this.halfContent=this.postData.content.substr(0,400);
    this.halfContent+="...";
    // console.log(this.halfContent);
  }

  

  delete(){
    firebase.firestore().collection("posts").doc(this.post.id).delete().then(()=>{
      this.onDelete.emit();
      this.toastrService.success("Post Deleted Successfully.")
    });

   }

}
