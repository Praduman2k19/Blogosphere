import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import  firebase from "firebase/app";
import 'firebase/auth';
import { formatCurrency } from '@angular/common';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup ;  //myForm is a object of formGroup
  message:string="";
  userError:any;

constructor( public fb:FormBuilder ,public authService:AuthService) 
{
  this.myForm=this.fb.group({
    firstName:['',[Validators.required]],
    lastName :['',[Validators.required]],
    email :['',[Validators.required]],
    password:['',[Validators.required,Validators.minLength(8)]],
    confirmPassword:['',[Validators.required]],
  })
}

 


onSubmit(signupform:any)
  {
    let firstName:string=signupform.value.firstName;
    let lastName:string=signupform.value.lastName;
    let email:string=signupform.value.email;
    let password:string=signupform.value.password;

    this.authService.signup(email,password,firstName,lastName).then((user:any)=>{
      
      firebase.firestore().collection("users").doc(user.uid).set({
        firstName:signupform.value.firstName,
        lastName:signupform.value.lastName,
        email:signupform.value.email,
        photoURL:user.photoURL,
        displayName:signupform.value.firstName+" "+signupform.value.lastName,
        interests:"",
        bio:"",
        hobbies:""
        
      }).then(()=>{
        this.userError=null;
        this.message="You have been signed up successfully. Please login"
      })
      }).catch((error)=>{
        console.log(error);
        this.message="";
        this.userError=error;
      })
  
  }


  ngOnInit(): void {
  }

}
