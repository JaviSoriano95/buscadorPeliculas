import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {


  constructor(private http: HttpClient) {}

  getFilms(param: string): Observable<Movie> {
    return  this.http
      .get<Movie>(`https://www.omdbapi.com/?apikey=307bcc1&s=${param}`)

  }
}
