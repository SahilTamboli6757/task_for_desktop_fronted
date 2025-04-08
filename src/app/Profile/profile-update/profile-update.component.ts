import { Component, effect, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../Services/profile.service';
import { TranslateService } from '../../Services/translate.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-update',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css',
})
export class ProfileUpdateComponent implements OnInit {
  profileForm!: FormGroup;

  fb = inject(FormBuilder);

  router = inject(Router);

  profieService = inject(ProfileService);

  transalteData: any;

  constructor(private translateService: TranslateService) {

    effect(() => {

      const lang = this.translateService.currentLang();

      this.fetchTranslation();

    });
  }

  fetchTranslation() {

    const lang = this.translateService.currentLang();

    this.translateService.getTranslation(lang, 'profile-update').subscribe({
      next: (response) => {

        this.transalteData = response.data;
        console.log(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

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
