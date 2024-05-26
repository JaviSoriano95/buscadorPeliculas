import { Component } from '@angular/core';
import { Movie, Search } from '../../interfaces/movie';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'mainPage',
  templateUrl: './mainPage.component.html',
  styleUrls: ['./mainPage.component.css'],
})
export class MainPageComponent {
  public searchInput = new FormControl<string>('');
  public checkInput = new FormControl<Boolean>(false);

  public movies: Search[] = [];
  public moviesSort: Search[] = [];
  public moviesKeep: Search[] = [];
  public messageError: string = '';
  public lastParams: string = '';

  constructor(private searchService: SearchService) {}

  buscar() {

    if (!this.validar()) {
      return;
    }

    this.messageError = '';

    this.searchService
      .getFilms(this.searchInput.value!)
      .subscribe((result: Movie) => {
        this.movies = result.Search.map((item: Search) =>
          this.transformMovie(item)
        );
      });

      this.checkInput.setValue(false);
  }
  transformMovie(movie: any): Search {
    return {
      title: movie.Title,
      year: movie.Year,
      imdbID: movie.imdbID,
      type: movie.Type.toLowerCase(),
      poster: movie.Poster,
    };
  }

  validar() {
    if (!this.searchInput.value || this.searchInput.value.length < 3) {
      this.messageError = 'Debe ingresar al menos 3 caracteres';
      return false;
    }

    if (this.lastParams === this.searchInput.value) {
      return false;
    }
    this.lastParams = this.searchInput.value;

    if (
      this.searchInput.value.startsWith(' ') ||
      this.searchInput.value.trim() === ''
    ) {
      this.messageError = 'La búsqueda no puede empezar con espacios';
      return false;
    }

    return true;
  }

  ordenar(check: HTMLInputElement) {
    if (this.movies.length == 0) return;
    if (check.checked) {
      this.moviesKeep = JSON.parse(JSON.stringify(this.movies));
      this.moviesSort = this.movies.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      this.movies = this.moviesSort;
    } else {
      this.movies = this.moviesKeep;
    }
  }
}
