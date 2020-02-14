import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Game } from "../models/Game";
import { enviroment_var } from '../config/config'


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGames(){
    return this.http.get<Game>(`${enviroment_var.SERVER_URL}/games`);
  }

  getGame(id: String){
    return this.http.get<Game>(`${enviroment_var.SERVER_URL}/games/${id}`)
  }

  createGame(game: Game){
    return this.http.post(`${enviroment_var.SERVER_URL}/games`, game)
  }

  updateGame(id: String, updatedGame: Game){
    return this.http.put(`${enviroment_var.SERVER_URL}/games/${id}`, updatedGame)
  }

  deleteGame(id: String){
    return this.http.delete(`${enviroment_var.SERVER_URL}/games/${id}`)
  }

  searchGame(title: String){
    return this.http.get<Game>(`${enviroment_var.SERVER_URL}/games/search/${title}`)
  }
}
