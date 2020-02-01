import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from "../services/games.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {

  constructor(private gameService: GamesService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const id = next.paramMap.get('id');

      return this.gameService.getGame(id).pipe(
        map(game=>{ 
          if (game != null) {
            return true;
            
          }
          
          this.router.navigateByUrl('/games');
          return false;
         })
      );

  }
  
}
