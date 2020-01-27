import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Film } from "../models/Film";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  API_URI= "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getFilms(){
    return this.http.get<Film>(`${this.API_URI}/films`)
  }

  getFilm(id: String){
    return this.http.get(`${this.API_URI}/films/${id}`)
  }

  saveFilm(film: Film){
    return this.http.post(`${this.API_URI}/films`, film)
  }

  updateFilm(id: String, updateFilm: Film){
    return this.http.put(`${this.API_URI}/films/${id}`, updateFilm)
  }

  deleteFilm(id: String){
    return this.http.delete(`${this.API_URI}/films/${id}`)
  }
}
