import { TaskService } from './task.service';
import { ProjectService } from './project.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { DragDropService } from './drag-drop.service';
import { LoginService } from './login.service';

const COMMON = [
  DragDropService,
  LoginService,
  ProjectService,
  TaskService,
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
