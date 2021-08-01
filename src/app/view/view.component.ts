import { Component, OnInit , NgZone, Input } from '@angular/core';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
import { ActivatedRoute } from '@angular/router';
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
     this.postId=this.activatedRoute.snapshot.paramMap.get("postId");
    
    //  firebase.firestore().settings({
    //   //  timestampsInSnapshot:true 
    //  })
    firebase.firestore().collection("posts").doc(this.postId).get().then((docSnampshot)=>{
      this.ngZone.run(()=>{
        this.post=docSnampshot.data();
        // console.log(this.post);
        this.getUser();
      });
      
    });
  }

  getUser()
  {
    firebase.firestore().collection("users").doc(this.post.owner).get().then((documentSnapshot)=>{
      this.user=documentSnapshot.data();
      this.displayName=this.user.firstName+" "+this.user.lastName;
    }).catch((err)=>{
      console.log(err);
    })
  }
  ngOnInit() {
    
}

}
