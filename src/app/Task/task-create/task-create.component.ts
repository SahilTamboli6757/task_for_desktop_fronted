import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  imports: [ ReactiveFormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent implements OnInit  {

taskForm!: FormGroup;
 fb = inject(FormBuilder)

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
 console.log(this.taskForm.value);
}

}
