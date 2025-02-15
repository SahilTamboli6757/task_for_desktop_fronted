import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'app-task-show',
  imports: [],
  templateUrl: './task-show.component.html',
  styleUrl: './task-show.component.css',
})
export class TaskShowComponent implements OnInit {
  taskId!: number;

  task: any = {};

  route = inject(ActivatedRoute);

  router = inject(Router);

  taskService = inject(TaskService);

  constructor() {}

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
