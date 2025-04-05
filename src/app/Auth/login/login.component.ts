import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  authService  = inject(AuthService);
  router = inject(Router);

  fb = inject(FormBuilder);

  constructor() {}

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

    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {

        localStorage.setItem('token', data.token);

        this.router.navigate(['/']);
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

}
