import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Movie } from '../model/movie';
import { LoginDto } from '../model/login-dto';
import { AuthResponse } from '../model/auth-response';
import { RegisterDto } from '../model/register-dto';
import { SearchResponse } from '../model/search-response';
import { Rating } from '../model/rating';
import { PageinatedResponse } from '../model/pageinated-response';

const baseUrl = 'http://localhost:8083/api/v1/movies';
const authUrl = 'http://localhost:8083/auth';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (this.isBrowser()) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return headers;
  }

  rateMovie(ratingModel: Rating): Observable<any> {
    const url = 'http://localhost:8083/api/v1/ratings';
    const headers = this.createHeaders(); 
  
    return this.http.post(url, ratingModel, {
      headers,
      responseType: 'text' as 'json'
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAvgRating(movieId: string): Observable<any> {
    const url = `http://localhost:8083/api/v1/ratings?id=${encodeURIComponent(movieId)}`;
    return this.http.get<any>(url, { headers: this.createHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${authUrl}/login`, credentials).pipe(
      map((response) => {
        if (this.isBrowser()) {
          localStorage.setItem('jwt_token', response.token);
          localStorage.setItem('role', response.role); 
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  register(userData: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${authUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

getAllForUser(page: number = 0, size: number = 5): Observable<PageinatedResponse<Movie>> {
  const url = `${baseUrl}?page=${page}&size=${size}`;
  return this.http.get<PageinatedResponse<Movie>>(url, {
   headers: this.createHeaders()
  }).pipe(
    catchError(this.handleError)
  );
}

  searchMoviesByTitleInternal(title: string): Observable<Movie[]> {
    const url = `${baseUrl}/search?title=${encodeURIComponent(title)}`;
    return this.http.get<Movie[]>(url, { headers: this.createHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

 

  addMovie(movie: Movie): Observable<Movie> {
    const url = `${baseUrl}/add`;
    return this.http.post<Movie>(url, movie, { headers: this.createHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  removeMovie(id: string): Observable<string> {
    const url = `${baseUrl}/${id}`;
    return this.http.delete(url, {
      headers: this.createHeaders(),
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  getMovieByIdInternal(imdbId: string): Observable<Movie> {
    const url = `${baseUrl}/id?id=${imdbId}`;
    return this.http.get<Movie>(url, { headers: this.createHeaders() }).pipe(
      catchError(this.handleError)
    );
  }


  isLoggedIn(): boolean {
    return this.isBrowser() && !!localStorage.getItem('jwt_token');
  }

  getRole(): string | null {
    return this.isBrowser() ? localStorage.getItem('role') : null;
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('role');
    }
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else if (error.status === 401) {
      errorMessage = 'Session expired. Please login again.';
    } else if (error.status === 403) {
      errorMessage = 'You don\'t have permission for this action';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Server error: ${error.status} ${error.statusText}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  transformMovieResponse(movieData: any): Movie {
    return {
      title: movieData.Title,
      year: movieData.Year,
      rated: movieData.Rated,
      released: movieData.Released,
      runtime: movieData.Runtime,
      genre: movieData.Genre,
      director: movieData.Director,
      writer: movieData.Writer,
      actors: movieData.Actors,
      plot: movieData.Plot,
      language: movieData.Language,
      country: movieData.Country,
      awards: movieData.Awards,
      poster: movieData.Poster,
      ratings: movieData.Ratings || [],
      metaScore: movieData.Metascore,
      imdbRating: movieData.imdbRating,
      imdbVotes: movieData.imdbVotes,
      type: movieData.Type,
      dvd: movieData.DVD,
      boxOffice: movieData.BoxOffice,
      production: movieData.Production,
      website: movieData.Website,
      imdbID: movieData.imdbID
    };
  }
}
