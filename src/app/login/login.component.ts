import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup , FormControl , Validator, Validators } from '@angular/forms';
import  firebase from "firebase/app";
import 'firebase/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  myForm:FormGroup;
  message:string="";
  userError:any;

  constructor(public fb : FormBuilder,public router:Router,private toastrService:ToastrService)
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
      console.log(data?.user?.uid);
      var uid=data?.user?.uid?data?.user?.uid:"";
      localStorage.setItem('auth_token', uid)
      this.userError=null
      this.message="You have been logged in successfully."
      this.toastrService.success("You have been logged in successfully.")
      this.router.navigateByUrl('blogs');
    },err=>{
      console.log(err);
      this.message="";
      this.userError=err;
      if(err?.message=="There is no user record corresponding to this identifier. The user may have been deleted.")
        this.toastrService.warning("This email id is is not registered.")
      else if(err?.message=="The password is invalid or the user does not have a password.")
        this.toastrService.error("Your password is wrong.")
      else if(err?.message=="Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.")
        this.toastrService.warning("Access to this account has been temporarily disabled due to many failed login attempts. You can try again later.")
      else
      this.toastrService.error(err?.message)
    })
  }


  ngOnInit(): void {
  }

}
