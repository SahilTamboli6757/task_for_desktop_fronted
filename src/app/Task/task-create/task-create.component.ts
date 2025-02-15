import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  imports: [ ReactiveFormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent implements OnInit  {

taskForm!: FormGroup;

router = inject(Router);

fb = inject(FormBuilder)

taskService = inject(TaskService);

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
