import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from "../services/users.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router){}

  canActivate(): boolean{
    
    if(this.userService.loggedIn()){
      return true;
    }

    this.router.navigate(['user/login'])
    return false;

    
  }
  
}
