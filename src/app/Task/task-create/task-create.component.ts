import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { Router } from '@angular/router';
import { TranslateService } from '../../Services/translate.service';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-create',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent implements OnInit {

  taskForm!: FormGroup;

  router = inject(Router);

  fb = inject(FormBuilder)

  taskService = inject(TaskService);

  transalteData: any;

  constructor(private translateService: TranslateService) {

    effect(() => {

      const lang = this.translateService.currentLang();

      this.fetchTranslation();
    });
  }

  fetchTranslation() {

    const lang = this.translateService.currentLang();

    this.translateService.getTranslation(lang, 'create-task').subscribe({
      next: (response) => {
        this.transalteData = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  onSubmit() {
    this.taskService.createTask(this.taskForm.value).subscribe(() => {
      this.taskForm.reset();
      this.router.navigate(['/']);
    });
  }

}
