import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { TranslateService } from '../../Services/translate.service';

@Component({
  selector: 'app-task-edit',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent implements OnInit {

  ediTTtaskForm!: FormGroup;

  route = inject(ActivatedRoute);

  router = inject(Router);

  taskId!: number;

  fb = inject(FormBuilder);

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

      this.translateService.getTranslation(lang, 'edit-task').subscribe({
        next: (response) => {

          this.transalteData = response.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.params['id'];

    this.initForm();
    this.fetchTask();
  }

  fetchTask() {
    this.taskService.getTask(this.taskId).subscribe((data) => {
      this.ediTTtaskForm.patchValue(data.task);
    });
  }

  onSubmit() {
    if (this.ediTTtaskForm.invalid) {
      return;
    }
    this.taskService
      .updateTask(this.ediTTtaskForm.value, this.taskId)
      .subscribe((data) => {
        this.router.navigate(['/']);
      });
  }

  initForm() {
    this.ediTTtaskForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }
}
