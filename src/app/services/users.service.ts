import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI= "http://localhost:3000"

  constructor(private http: HttpClient) { }

  signUp(user: User){
    return this.http.post(`${this.API_URI}/users/signup`, user)
  }

  signIn(user: User){
    return this.http.post(`${this.API_URI}/users/signin`, user)
  }

  getUserByEmail(email: String){
    return this.http.get<User[]>(`${this.API_URI}/users/email/${email}`)
  }

  getUserByUsername(username: String){
    return this.http.get<User[]>(`${this.API_URI}/users/username/${username}`)
  }
}
