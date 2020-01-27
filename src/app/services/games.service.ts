import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Game } from "../models/Game";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  API_URI= "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getGames(){
    return this.http.get<Game>(`${this.API_URI}/games`);
  }

  getGame(id: String){
    return this.http.get<Game>(`${this.API_URI}/games/${id}`)
  }

  createGame(game: Game){
    return this.http.post(`${this.API_URI}/games`, game)
  }

  updateGame(id: String, updatedGame: Game){
    return this.http.put(`${this.API_URI}/games/${id}`, updatedGame)
  }

  deleteGame(id: String){
    return this.http.delete(`${this.API_URI}/games/${id}`)
  }

  searchGame(title: String){
    return this.http.get<Game>(`${this.API_URI}/games/search/${title}`)
  }
}
