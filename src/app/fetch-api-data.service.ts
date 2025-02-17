import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'; // Import environment

//Declaring the api url that will provide data for the client app
//const apiUrl = 'https://REMOVED.herokuapp.com/'; //HOSTED_API_URL (replaced by environment variable)

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService { //Initially was UserRegistrationService
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
 private apiUrl = environment.apiUrl; // To use environment variable
 constructor(private http: HttpClient) {
  }

  // Method making the api call for the user registration endpoint
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(this.apiUrl + 'users', userData).pipe(
    catchError(this.handleError)
    );
  }

  // Method making the api call for the user login endpoint
  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(this.apiUrl + 'login', userData).pipe(
    catchError(this.handleError)
    );
  }

  // Method making the api call to get all movies from the myFlix API
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || { };
  }

  // Method making the api call to get one movie from the myFlix API
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/:Title' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method making the api call to get a director by name from the myFlix API
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/director/:directorName', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method making the api call to get the movies for a specified genre from the myFlix API
  getGenre(name: string): Observable<any> { // Change made based on instructor feedback task 6.2. Not sure why!
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/genre/:genreName', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method making the api call to get a user by name from the myFlix API

  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }
/*  getUser(): Observable<any> { // My code, trying to resolve issues and tried above code
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }*/

  // Method making the api call to get a user's favourite movies from the myFlix API
  getFavouriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'users/:Username/movies' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method making the api call to add a movie to a user's favourites
  addFavouriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie);
    console.log('in fetch api service_id: ', movie._id);
    return this.http.post(this.apiUrl + 'users/' + user.Username + '/movies/' + movie._id, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method making the api call to edit a user's info
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(this.apiUrl + 'users/' + userData.Username, userData, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method making the api call to delete a user
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(this.apiUrl + 'users/' + user.Username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method making the api call to delete a movie from the user's favorite movies
  deleteFavouriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie._id);
    return this.http.delete(this.apiUrl + 'users/' + user.Username + '/movies/' + movie._id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(`Error Status code ${error.status}, ` +
        `Error body is: ${JSON.stringify(error.error)}`);
    console.error('Full error object:', error);
    }
    return throwError('Something bad happened; please try again later.');
  }
}

