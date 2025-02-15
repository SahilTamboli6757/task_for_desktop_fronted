import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [NgbDropdownModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout().subscribe({

      next: (data) => {

        localStorage.removeItem('token');

        this.router.navigate(['/login']);

      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
