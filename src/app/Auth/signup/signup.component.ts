import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  fb = inject(FormBuilder);

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
    console.log(this.signupForm.value);
  }
}
