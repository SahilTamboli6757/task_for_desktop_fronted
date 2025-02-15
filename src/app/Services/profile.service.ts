import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: ApiService) { }

  getProfile() {
    return this.apiService.get('profile');
  }

  updateProfile(body: object) {
    return this.apiService.put('profile/update', body);
  }
}
