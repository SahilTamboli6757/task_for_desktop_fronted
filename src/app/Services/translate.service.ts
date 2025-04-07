import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  get currentLan(): string {
    return localStorage.getItem('lang') || 'en';
  }

  constructor(private apiService: ApiService) { }

  readonly langs = [
    { key: "en", value: "English" },
    { key: "ma", value: "मराठी" },
    { key: "ha", value: "हिन्दी" },
    { key: "ta", value: "மொழிபெயர்" },

  ];

  getTranslation(lang: string, component: string) {

    const params = new HttpParams({
      fromObject: {
        lang: lang,
        component: component
      }
    });
    return this.apiService.get('translate', params);
  }
}
