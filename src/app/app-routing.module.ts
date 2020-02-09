import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule'},
  { path: 'register', loadChildren: './modules/register/register.module#RegisterModule'},
  { path: 'project', loadChildren: './modules/projects/projects.module#ProjectsModule'},
  { path: 'task', loadChildren: './modules/tasks/tasks.module#TasksModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
