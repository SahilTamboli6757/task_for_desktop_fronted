import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-update',
  imports: [ ReactiveFormsModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css'
})
export class ProfileUpdateComponent implements OnInit {

  profileForm!: FormGroup;

  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
     console.log(this.profileForm.value);
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }
}
