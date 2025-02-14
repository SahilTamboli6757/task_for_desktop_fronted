import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-show',
  imports: [ ReactiveFormsModule],
  templateUrl: './profile-show.component.html',
  styleUrl: './profile-show.component.css',
})
export class ProfileShowComponent implements OnInit {
  profileForm!: FormGroup;

  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }
}
