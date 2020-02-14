import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Film } from "../models/Film";
import { enviroment_var } from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  getFilms(){
    return this.http.get<Film>(`${enviroment_var.SERVER_URL}/films`)
  }

  getFilm(id: String){
    return this.http.get(`${enviroment_var.SERVER_URL}/films/${id}`)
  }

  saveFilm(film: Film){
    return this.http.post(`${enviroment_var.SERVER_URL}/films`, film)
  }

  updateFilm(id: String, updateFilm: Film){
    return this.http.put(`${enviroment_var.SERVER_URL}/films/${id}`, updateFilm)
  }

  deleteFilm(id: String){
    return this.http.delete(`${enviroment_var.SERVER_URL}/films/${id}`)
  }
}
