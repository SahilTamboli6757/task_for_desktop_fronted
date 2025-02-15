import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  fb = inject(FormBuilder);

  authService = inject(AuthService);

  router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.initForm();
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
}
