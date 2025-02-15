import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  apiUrl: string = environment.apiUrl;

  get authenTicated() { return localStorage.getItem('token') }

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(body: object) {
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(`${this.apiUrl}/login`, body, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  logout() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient.get(`${this.apiUrl}/logout`, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  register(body: object) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(`${this.apiUrl}/signup`, body, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        console.error('Register failed:', error);
        throw error;
      })
    );
  }

}
