import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup , FormControl , Validator, Validators } from '@angular/forms';
import  firebase from "firebase/app";
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  
  myForm:FormGroup;
  message:string="";
  userError:any;

  constructor(public fb : FormBuilder) 
  { 
    this.myForm=this.fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required , Validators.minLength(8)]]
    })
  }

  onSubmit(form: { value: { email: string; password: string; }; })
  {
    firebase.auth().signInWithEmailAndPassword(form.value.email,form.value.password)
    .then((data)=>{
      console.log(data);
      this.userError=null
      this.message="You have been logged in successfully."
    }).catch((error)=>{
      console.log(error);
      this.message="";
      this.userError=error;
    })
  }

  
  ngOnInit(): void {
  }

}
