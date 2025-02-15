import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'app-task-info',
  imports: [RouterModule],
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.css',
})
export class TaskInfoComponent {
  router = inject(Router);

  taskService = inject(TaskService);

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
