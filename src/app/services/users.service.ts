import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
import { tap, catchError, mapTo } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { enviroment_var } from '../config/config'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router,
    private toastrService: ToastrService) { }

  signUp(user: User){
    return this.http.post(`${enviroment_var.SERVER_URL}/users/signup`, user)
  }

  signIn(user: User): Observable<boolean>{
    return this.http.post<any>(`${enviroment_var.SERVER_URL}/users/signin`, user).pipe(
      tap(tokens => this.storeTokens(tokens))
    );
  }

  private storeTokens(tokens){
    localStorage.setItem('ACCESS_TOKEN', tokens.token)
    localStorage.setItem('REFRESH_TOKEN', tokens.refreshToken)
  }

  loggedIn(): Boolean{
    if(localStorage.getItem('ACCESS_TOKEN')){
        return true;
      }
          
    return false;
  }

  getToken(){
    return localStorage.getItem('ACCESS_TOKEN');
  }

  getRefreshToken(){
    return localStorage.getItem('REFRESH_TOKEN');
  }

  refreshToken(){
    return this.http.post<any>(`${enviroment_var.SERVER_URL}/users/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(token => {
        localStorage.setItem('ACCESS_TOKEN', token.accessToken)
      }
    ))
  }

  logout(msg: string){
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    this.router.navigate(['/'])
    this.toastrService.info(msg)
  }

  getUserByEmail(email: String){
    return this.http.get<User[]>(`${enviroment_var.SERVER_URL}/users/email/${email}`)
  }

  getUserByUsername(username: String){
    return this.http.get<User[]>(`${enviroment_var.SERVER_URL}/users/username/${username}`)
  }
}
