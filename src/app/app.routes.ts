import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { TaskCreateComponent } from './Task/task-create/task-create.component';
import { TaskEditComponent } from './Task/task-edit/task-edit.component';
import { TaskShowComponent } from './Task/task-show/task-show.component';
import { ProfileShowComponent } from './Profile/profile-show/profile-show.component';
import { ProfileUpdateComponent } from './Profile/profile-update/profile-update.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: '', component: TaskListComponent },
  { path: 'task/create', component: TaskCreateComponent },
  { path: 'task/:id', component: TaskShowComponent },
  { path: 'task/edit/:id', component: TaskEditComponent },
  { path: 'profile', component: ProfileShowComponent },
  { path: 'profile/update', component: ProfileUpdateComponent }

];
