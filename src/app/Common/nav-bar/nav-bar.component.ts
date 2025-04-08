import { Component, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../Services/auth.service';
import { TranslateComponent } from "../translate/translate.component";
import { TranslateService } from '../../Services/translate.service';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [NgbDropdownModule, RouterModule, TranslateComponent,NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  authService = inject(AuthService);
  router = inject(Router);
  transalteData: any;

  logout() {
    this.authService.logout().subscribe({

      next: (data) => {

        localStorage.clear();

        this.router.navigate(['/login']);

      },
      error: (error) => {
      },
    });
  }

  constructor(private translateService: TranslateService) {

    effect(() => {

      const lang = this.translateService.currentLang();

      this.fetchTranslation();
    });
  }

  fetchTranslation() {

    const lang = this.translateService.currentLang();

    this.translateService.getTranslation(lang, 'nav-bar').subscribe({
      next: (response) => {

        this.transalteData = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
