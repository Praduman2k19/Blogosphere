import { Injectable } from '@angular/core';
import  firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  message:string="";
  userError:any;

  constructor(private toastrService:ToastrService) { }

  signup(email: string, password: string, firstName: string, lastName: string) {

    return new Promise((resolve,reject)=>{

    firebase.auth().createUserWithEmailAndPassword(email,password).then((res)=>{
      console.log(res)
      this.toastrService.success("Account created successfully.")
      // let randomnum=Math.floor(Math.random()*100);
      res.user?.updateProfile({
        displayName: firstName + " " + lastName,
        photoURL: "https://i.pravatar.cc/300"
      }) .then(()=>{
        resolve(res.user);
        console.log(res.user);
        var uid=res?.user?.uid?res?.user?.uid:"";
        localStorage.setItem('auth_token', uid)
      })
    },err=>{
     reject(err);
     console.log(err)
    })
    })
  }
}


