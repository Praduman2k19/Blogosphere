import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
// import { resolve } from 'dns';
import { Observable } from 'rxjs';
import  firebase from "firebase/app";
import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( public router:Router) {}
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean>| Promise<boolean>| boolean {
  //     return new Promise((resolve,reject)=>{
  //       firebase.auth().onAuthStateChanged((user)=>{
  //         if(user)
  //         resolve(true)
  //         else{
  //           this.router.navigate(['/login']);
  //           resolve(false);
  //         }

  //       })
  //     })
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('auth_token')=='true')
      return true;
    else{
      this.router.navigateByUrl('login-admin')
      return false
    }
  }
}
