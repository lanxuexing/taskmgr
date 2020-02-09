import { NgModule } from '@angular/core';
import { ShareModule } from './../../share';
import { TaskHomeComponent } from './task-home';
import { TaskItemComponent } from './task-item';
import { TaskListComponent } from './task-list';
import { TasksRoutingModule } from './tasks.routing';
import { TaskHeaderComponent } from './task-header';
import { TaskAddComponent } from './task-add';
import { TaskCopyComponent } from './task-copy';

const COMMON = [
  TaskHomeComponent,
  TaskListComponent,
  TaskItemComponent,
  TaskHeaderComponent,
  TaskAddComponent,
  TaskCopyComponent,
];

const ENTRY = [
  TaskAddComponent,
  TaskCopyComponent,
];

@NgModule({
  declarations: [
    ...COMMON
  ],
  imports: [
    ShareModule,
    TasksRoutingModule
  ],
  entryComponents: [
    ...ENTRY
  ]
})
export class TasksModule { }
