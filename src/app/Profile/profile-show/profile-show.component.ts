import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../Services/profile.service';
import { TranslateService } from '../../Services/translate.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-show',
  imports: [ ReactiveFormsModule, NgIf],
  templateUrl: './profile-show.component.html',
  styleUrl: './profile-show.component.css',
})
export class ProfileShowComponent implements OnInit {

  profileForm!: FormGroup;

  fb = inject(FormBuilder);

  profileService = inject(ProfileService);


    transalteData: any;

    constructor(private translateService: TranslateService) {

      effect(() => {

        const lang = this.translateService.currentLang();

        this.fetchTranslation();
      });
    }

    fetchTranslation() {

      const lang = this.translateService.currentLang();

      this.translateService.getTranslation(lang, 'view-profile').subscribe({
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
    this.viewProfile();
  }


  viewProfile() {
    this.profileService.getProfile().subscribe((response: any) => {
      // console.log(response);
      this.profileForm.patchValue(response.user);
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
