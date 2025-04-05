import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../Services/profile.service';

@Component({
  selector: 'app-profile-update',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css',
})
export class ProfileUpdateComponent implements OnInit {
  profileForm!: FormGroup;

  fb = inject(FormBuilder);

  router = inject(Router);

  profieService = inject(ProfileService);

  ngOnInit(): void {
    this.initForm();
    this.getProfile();
  }

  getProfile() {
    this.profieService.getProfile().subscribe((response: any) => {
      // console.log(response);
      this.profileForm.patchValue(response.user);
    });
  }

  onSubmit() {
    this.profieService
      .updateProfile(this.profileForm.value)
      .subscribe((response: any) => {
        // console.log(response);
        this.router.navigate(['/profile']);
      });
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }
}
