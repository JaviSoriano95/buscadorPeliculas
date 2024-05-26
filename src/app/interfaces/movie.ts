export interface Movie {
  Search:       Search[];
  totalResults: string;
  Response:     string;
}

export interface Search {
  title:  string;
  year:   string;
  imdbID: string;
  type:   Type;
  poster: string;
}

export enum Type {
  Movie = "movie",
  Series = "series",
}

