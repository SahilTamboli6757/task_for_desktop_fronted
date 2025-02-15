import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../Services/profile.service';

@Component({
  selector: 'app-profile-show',
  imports: [ ReactiveFormsModule],
  templateUrl: './profile-show.component.html',
  styleUrl: './profile-show.component.css',
})
export class ProfileShowComponent implements OnInit {

  profileForm!: FormGroup;

  fb = inject(FormBuilder);

  profileService = inject(ProfileService);

  ngOnInit(): void {
    this.initForm();
    this.viewProfile();
  }


  viewProfile() {
    this.profileService.getProfile().subscribe((response: any) => {
      console.log(response);
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
