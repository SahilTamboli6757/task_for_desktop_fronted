import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = environment.apiUrl;

  get authenTicated() {
    return localStorage.getItem('token');
  }

  // headers = new HttpHeaders({
  //   Authorization: `Bearer ${this.authenTicated}`,
  //   'Content-Type': 'application/json',
  // });

  get headers() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  constructor(private httpClient: HttpClient, private router: Router) {}

  errorHandle(error: any) {
    if (error.status === 401) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else if (error.status === 403) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  get(path: string) {
    return this.httpClient
      .get(`${this.apiUrl}/${path}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {

          this.errorHandle(error);

          console.error('Get failed:', error);
          throw error;
        })
      );
  }

  post(path: string, body: object) {
    return this.httpClient
      .post(`${this.apiUrl}/${path}`, body, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          // console.log
          this.errorHandle(error);

          console.error('Get failed:', error);
          throw error;
        })
      );
  }

  put(path: string, body: object) {
    return this.httpClient
      .put(`${this.apiUrl}/${path}`, body, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {

          this.errorHandle(error);

          console.error('Get failed:', error);

          throw error;
        })
      );
  }

  delete(path: string) {
    return this.httpClient
      .delete(`${this.apiUrl}/${path}`, { headers: this.headers })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {

          this.errorHandle(error);

          console.error('Get failed:', error);
          throw error;
        })
      );
  }
}
