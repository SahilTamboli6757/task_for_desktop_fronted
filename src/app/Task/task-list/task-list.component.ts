import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { NgFor } from '@angular/common';
import { TaskInfoComponent } from "../task-info/task-info.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [NgFor, TaskInfoComponent, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {

  tasks: any = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetachTasks();
  }

  fetachTasks() {
    this.taskService.getTasks().subscribe((data) => {
      // console.log(data);
      this.tasks = data.tasks;
    });
  }
}
