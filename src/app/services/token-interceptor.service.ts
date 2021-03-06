import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { UserService } from "../services/users.service";
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private userService: UserService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any{
    //Si localStore tiene un token, se lo añadimos a la cabecera
    //con el esquema Bearer 'token'
    if(this.userService.getToken()){
      request = this.addToken(request, this.userService.getToken())
    } 
    return next.handle(request).pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && error.status === 401){
        return this.handle401Error(request, next);
      }else if(error instanceof HttpErrorResponse && error.status === 500){
        this.userService.logout('Your session has expired. You have to login again!')
        return throwError (error);
      }else{
        return throwError (error);
      }
    }))
    

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      //Refrescar el token
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
  
      return this.userService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          return next.handle(this.addToken(request, token.accessToken));
        }), finalize(() => {
          this.isRefreshing = false;
        }));
  
    } else {
      //Si durante el proceso de actualizacion del token
      //se realizan mas llamadas, utilizaremos
      //el nuevo token obtenido
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  private addToken(request: HttpRequest<any>, token: String){
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    })
  }


}
