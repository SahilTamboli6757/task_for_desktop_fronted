import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  imports: [ReactiveFormsModule],
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

  constructor() {}

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
    console.log(this.ediTTtaskForm.value);
  }

  initForm() {
    this.ediTTtaskForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }
}
