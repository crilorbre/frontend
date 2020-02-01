import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmsService } from "../services/films.service";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FilmGuard implements CanActivate {

  constructor(private filmService: FilmsService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const id = next.paramMap.get('id');

      return this.filmService.getFilm(id).pipe(
        map(film=>{ 
          if (film != null) {
            return true;
            
          }
          
          this.router.navigateByUrl('/films');
          return false;
         })
      );

  }
  
}
