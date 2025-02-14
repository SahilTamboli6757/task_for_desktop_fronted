import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { TaskCreateComponent } from './Task/task-create/task-create.component';
import { TaskEditComponent } from './Task/task-edit/task-edit.component';
import { TaskShowComponent } from './Task/task-show/task-show.component';
import { ProfileShowComponent } from './Profile/profile-show/profile-show.component';
import { ProfileUpdateComponent } from './Profile/profile-update/profile-update.component';
import { authGuard } from './Guard/auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: '', component: TaskListComponent, canActivate: [authGuard] },

  {
    path: 'task/create',
    component: TaskCreateComponent,
    canActivate: [authGuard],
  },
  { path: 'task/:id', component: TaskShowComponent, canActivate: [authGuard] },
  {
    path: 'task/edit/:id',
    component: TaskEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileShowComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/update',
    component: ProfileUpdateComponent,
    canActivate: [authGuard],
  },
];
