import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '../../Services/translate.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-translate',
  imports: [NgFor],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css'
})
export class TranslateComponent {

  @Output() langChanged = new EventEmitter<string>();

  constructor(private translateService: TranslateService) { }

  get langs() { return this.translateService.langs; }

  onChange(event: Event) {

    const selectedValue = (event.target as HTMLSelectElement).value;

    localStorage.setItem('lang', selectedValue);

    this.translateService.setLang(selectedValue);

    this.langChanged.emit(selectedValue);
  }

}
