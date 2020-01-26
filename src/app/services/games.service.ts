import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Game } from "../models/Game";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  API_URI= "http://localhost:3000/games"

  constructor(private http: HttpClient) { }

  getGames(){
    return this.http.get<Game>(this.API_URI);
  }

  deleteGame(id: String){
    return this.http.delete(`${this.API_URI}/${id}`)
  }

  searchGame(title: String){
    return this.http.get<Game>(`${this.API_URI}/search/${title}`)
  }
}
