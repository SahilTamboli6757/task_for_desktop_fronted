import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private apiService: ApiService) {}

  getTasks() {
    return this.apiService.get('tasks');
  }

  getTask(id: number | string) {
    return this.apiService.get('tasks/' + id);
  }

  createTask(body: object) {
    return this.apiService.post('tasks', body);
  }

  updateTask(body: object, id: number | string) {
    return this.apiService.put('tasks/' + id, body);
  }

  deleteTask(id: number | string) {
    return this.apiService.delete('tasks/' + id);
  }
}
