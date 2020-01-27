import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Material from '@angular/material';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//SERVICES
import { GamesService } from "./services/games.service";
import { FilmsService } from "./services/films.service";
import { MatDialogService } from "./services/mat-dialog.service";

//COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GameListComponent } from './components/game/game-list/game-list.component';
import { GameFormComponent } from './components/game/game-form/game-form.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { FilmListComponent } from './components/film/film-list/film-list.component';
import { FilmFormComponent } from './components/film/film-form/film-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GameListComponent,
    GameFormComponent,
    HomeComponent,
    PageNotFoundComponent,
    MatConfirmDialogComponent,
    FilmListComponent,
    FilmFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Material.MatDialogModule,
    Material.MatIconModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatSelectModule,
    Material.MatOptionModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [GamesService, FilmsService, MatDialogService],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
