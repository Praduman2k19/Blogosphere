import { Component, OnInit } from '@angular/core';
import  firebase from "firebase/app";
import '@firebase/firestore';
import 'firebase/auth';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  id:any;
  constructor() {
    this.id=firebase.auth().currentUser?.uid;
    this.ngOnInit()
    
   }

  ngOnInit(): void {
    this.id=firebase.auth().currentUser?.uid;
    // console.log(this.id+"id")
  }

}
