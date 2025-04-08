import { Component, effect, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { TranslateService } from '../../Services/translate.service';
import { JsonPipe, NgIf } from '@angular/common';
import { TranslateComponent } from "../../Common/translate/translate.component";

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, NgIf, TranslateComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  transalteData: any;

  authService = inject(AuthService);

  router = inject(Router);

  fb = inject(FormBuilder);

  constructor(private translateService: TranslateService) {

    effect(() => {
      const lang = this.translateService.currentLang();


      this.fetchTranslation();
    });
  }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {

    localStorage.clear();

    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {

        localStorage.setItem('token', data.token);

        this.router.navigate(['/']);
      },
      error: (error) => {
      },
    });
  }

  fetchTranslation() {

    const lang = this.translateService.currentLang();

    this.translateService.getTranslation(lang, 'signin').subscribe({
      next: (response) => {

        this.transalteData = response.data;
        // console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }



}
