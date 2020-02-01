import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//COMPONENTS
import { HomeComponent } from '../app/components/home/home.component';
import { PageNotFoundComponent } from '../app/components/page-not-found/page-not-found.component';
import { GameListComponent } from '../app/components/game/game-list/game-list.component';
import { FilmListComponent } from './components/film/film-list/film-list.component';
import { GameFormComponent } from './components/game/game-form/game-form.component';
import { FilmFormComponent } from './components/film/film-form/film-form.component';
import { SingUpComponent } from './components/user/sign-up/sing-up.component';
import { SingInComponent } from './components/user/sign-in/sing-in.component';

//GUARDS
import { AuthGuard } from "../app/guards/auth.guard";
import { GameGuard } from "../app/guards/game.guard";
import { FilmGuard } from "../app/guards/film.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: 'user/register',
    component: SingUpComponent
  },
  {
    path: 'user/login',
    component: SingInComponent
  },
  {
    path: 'games',
    component: GameListComponent
  },
  {
    path: 'games/add',
    component: GameFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'games/edit/:id',
    component: GameFormComponent,
    canActivate: [AuthGuard, GameGuard]
  },
  {
    path: 'films',
    component: FilmListComponent
  },
  {
    path: 'films/add',
    component: FilmFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'films/edit/:id',
    component: FilmFormComponent,
    canActivate: [AuthGuard, FilmGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
