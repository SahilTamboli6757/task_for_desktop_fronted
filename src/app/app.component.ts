import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./Common/nav-bar/nav-bar.component";
import { AuthService } from './Services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent , NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'task_frontend';

  authService = inject(AuthService);

  get isAuthenTicated () { return this.authService.authenTicated; };
}
