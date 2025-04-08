import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../Services/task.service';
import { TranslateService } from '../../Services/translate.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-show',
  imports: [NgIf],
  templateUrl: './task-show.component.html',
  styleUrl: './task-show.component.css',
})
export class TaskShowComponent implements OnInit {
  taskId!: number;

  task: any = {};

  route = inject(ActivatedRoute);

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

    this.translateService.getTranslation(lang, 'task-show').subscribe({
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
    this.route.params.subscribe((params) => {
      this.taskId = params['id'];
    });

    this.fetchTaskInfo();
  }

  fetchTaskInfo() {
    this.taskService.getTask(this.taskId).subscribe((data) => {
      // console.log(data);
      this.task = data.task;
    });
  }

  backtoHome() {
    this.router.navigateByUrl('/');
  }

  edit() {
    this.router.navigateByUrl(`/task/${this.task.id}/edit`);
  }

  delete() {
    this.taskService.deleteTask(this.taskId).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
