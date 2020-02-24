import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Material from '@angular/material';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from "ngx-pagination";

//SERVICES
import { GamesService } from "./services/games.service";
import { FilmsService } from "./services/films.service";
import { MatDialogService } from "./services/mat-dialog.service";
import { UserService } from "./services/users.service";
import { TokenInterceptorService } from "../app/services/token-interceptor.service";

//GUARDS
import { AuthGuard } from "../app/guards/auth.guard";
import { GameGuard } from "../app/guards/game.guard";
import { FilmGuard } from "../app/guards/film.guard";

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
import { SingUpComponent } from './components/user/sign-up/sing-up.component';
import { SingInComponent } from './components/user/sign-in/sing-in.component';
import { ProfileComponent } from './components/user/profile/profile.component';


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
    FilmFormComponent,
    SingUpComponent,
    SingInComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Material.MatDialogModule,
    Material.MatIconModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatSelectModule,
    Material.MatOptionModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgxPaginationModule
  ],
  providers: [GamesService, FilmsService, MatDialogService, UserService, 
    AuthGuard, GameGuard, FilmGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
