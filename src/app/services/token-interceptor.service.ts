import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { UserService } from "../services/users.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private userService: UserService) { }


  intercept(req, next){

    const token = this.userService.getToken()
    
    if(token){
      const cloned = req.clone({
        setHeaders : {
          Authorization: token
        }
      })
      return next.handle(cloned);
    }else{
      return next.handle(req);
    }
    

  }


}
