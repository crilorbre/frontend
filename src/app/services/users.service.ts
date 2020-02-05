import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI= "http://localhost:3000";
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router,
    private toastrService: ToastrService) { }

  signUp(user: User){
    return this.http.post(`${this.API_URI}/users/signup`, user)
  }

  signIn(user: User){
    return this.http.post(`${this.API_URI}/users/signin`, user)
  }

  loggedIn(): Boolean{
    if(localStorage.getItem('token')){
      if(!this.helper.isTokenExpired(this.getToken())){
        return true;
      }else{
        this.logout();
        this.toastrService.info('Your session has expired. You have to login again')
      }
    }
    return false;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/'])
    this.toastrService.info('Logout succesfully')
  }

  getUserByEmail(email: String){
    return this.http.get<User[]>(`${this.API_URI}/users/email/${email}`)
  }

  getUserByUsername(username: String){
    return this.http.get<User[]>(`${this.API_URI}/users/username/${username}`)
  }
}
