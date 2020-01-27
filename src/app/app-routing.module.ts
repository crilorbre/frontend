import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/home/home.component';
import { PageNotFoundComponent } from '../app/components/page-not-found/page-not-found.component';
import { GameListComponent } from '../app/components/game/game-list/game-list.component';
import { FilmListComponent } from './components/film/film-list/film-list.component';
import { GameFormComponent } from './components/game/game-form/game-form.component';
import { FilmFormComponent } from './components/film/film-form/film-form.component';


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
    path: 'games',
    component: GameListComponent
  },
  {
    path: 'games/add',
    component: GameFormComponent
  },
  {
    path:'games/edit/:id',
    component: GameFormComponent
  },
  {
    path: 'films',
    component: FilmListComponent
  },
  {
    path: 'films/add',
    component: FilmFormComponent
  },
  {
    path: 'films/edit/:id',
    component: FilmFormComponent
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
