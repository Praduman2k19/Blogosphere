import { Injectable } from '@angular/core';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  message:string="";
  userError:any;
  
  constructor() { }
  
  signup(email: string, password: string, firstName: string, lastName: string) {
    
    return new Promise((resolve,reject)=>{

    firebase.auth().createUserWithEmailAndPassword(email,password).then((Response)=>{
      console.log(Response)
      // let randomnum=Math.floor(Math.random()*100);
      Response.user?.updateProfile({
        displayName: firstName + " " + lastName,
        photoURL: "https://i.pravatar.cc/300"
      }) .then(()=>{
        resolve(Response.user);
        console.log(Response.user);
      })
    }).catch((error)=>{
     reject(error);
    })
    }) 
  }
}


