import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../Services/task.service';
import { TranslateService } from '../../Services/translate.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-info',
  imports: [RouterModule, NgIf],
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.css',
})
export class TaskInfoComponent {

  router = inject(Router);

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

      this.translateService.getTranslation(lang, 'task-info').subscribe({
        next: (response) => {

          this.transalteData = response.data;
          console.log(response.data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }

  @Input() task: any;

  @Output() taskDeleted = new EventEmitter();

  taskInfo() {
    this.router.navigateByUrl(`/task/${this.task.id}`);
  }

  edit() {
    this.router.navigateByUrl(`/task/${this.task.id}/edit`);
  }

  delete() {
    this.taskService.deleteTask(this.task.id).subscribe(() => {
      this.router.navigateByUrl('/');

      this.taskDeleted.emit();

    });
  }
}
