import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { TranslateComponent } from "../../Common/translate/translate.component";
import { TranslateService } from '../../Services/translate.service';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, ReactiveFormsModule, TranslateComponent, NgIf, JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {

  translateService = inject(TranslateService);

  signupForm!: FormGroup;

  fb = inject(FormBuilder);

  authService = inject(AuthService);

  router = inject(Router);
  transalteData: any;

  constructor() { }

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
    this.translateService.getTranslation(this.translateService.currentLan, 'signup').subscribe({
      next: (response) => {

        this.transalteData = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
