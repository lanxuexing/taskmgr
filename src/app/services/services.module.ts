import { TaskService } from './task.service';
import { ProjectService } from './project.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { DragDropService } from './drag-drop.service';
import { LoginService } from './login.service';
import { UserService } from './user.service';
import { ToastService } from './toast.service';

const COMMON = [
  DragDropService,
  LoginService,
  ProjectService,
  TaskService,
  UserService,
  ToastService,
];


@NgModule({
  providers: [
    ...COMMON
  ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule
    };
  }
}
