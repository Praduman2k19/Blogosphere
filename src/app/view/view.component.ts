import { Component, OnInit , NgZone, Input } from '@angular/core';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  post:any={};
  postId:any;
  user:any;
  displayName:string=""

  constructor(public activatedRoute:ActivatedRoute, public ngZone:NgZone) {
     this.activatedRoute.params.subscribe(res=>{
       this.postId=res?.id;
       console.log(res?.id)
     })
    // this.router.

    //  firebase.firestore().settings({
    //   //  timestampsInSnapshot:true
    //  })

  }
  ngOnInit() {
    console.log("postid")
    console.log(this.postId)
    firebase.firestore()?.collection("posts")?.doc(this.postId)?.get()?.then((res)=>{
      this.ngZone?.run(()=>{
        this.post=res?.data();
        console.log(this.post);
        this.getUser();
      });
    },err=>{
      console.log(err);
    });
  }

  getUser()
  {
    firebase.firestore()?.collection("users")?.doc(this.post.owner)?.get()?.then((res)=>{
      this.user=res?.data();
      this.displayName=this.user?.firstName+" "+this.user?.lastName;
    },err=>{
      console.log(err);
    })
  }


}
