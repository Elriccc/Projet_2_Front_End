import { Routes } from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {StudentsComponent} from './pages/students/students.component';
import {StudentComponent} from './pages/student/student.component';
import {AppComponent} from './app.component';
import {userGuard} from './user-guard.guard'

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },{
    path: 'students',
    component: StudentsComponent,
    canActivate: [userGuard]
  },{
    path: 'students/:studentNumber',
    component: StudentComponent,
    canActivate: [userGuard]
  }

];
