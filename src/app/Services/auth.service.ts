import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenTicated: boolean = false;

  constructor() { }

  login() {
    this.authenTicated = true;
  }

  logout() {
    this.authenTicated = false;
  }



}
