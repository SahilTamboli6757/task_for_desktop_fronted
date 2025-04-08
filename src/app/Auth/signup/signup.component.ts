import { Component, effect, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { TranslateComponent } from "../../Common/translate/translate.component";
import { TranslateService } from '../../Services/translate.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, ReactiveFormsModule, TranslateComponent, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  fb = inject(FormBuilder);

  authService = inject(AuthService);

  router = inject(Router);

  transalteData: any;

  constructor(private translateService: TranslateService) {

    effect(() => {
      const lang = this.translateService.currentLang();


      this.fetchTranslation();
    });
  }

  ngOnInit() {
    this.initForm();
    this.fetchTranslation();
  }

  initForm() {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    this.authService.register(this.signupForm.value).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);

        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Signup failed:', error);
      },
    });
  }

  langUpdated() {
    this.fetchTranslation();
  }

  fetchTranslation() {

    const lang = this.translateService.currentLang();

    this.translateService.getTranslation(lang, 'signup').subscribe({
      next: (response) => {

        this.transalteData = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
