import { NgModule } from '@angular/core';
import { ShareModule } from './../../share';
import { TaskHomeComponent } from './task-home';
import { TaskItemComponent } from './task-item';
import { TaskListComponent } from './task-list';
import { TasksRoutingModule } from './tasks.routing';
import { TaskHeaderComponent } from './task-header';

const COMMON = [
  TaskHomeComponent,
  TaskListComponent,
  TaskItemComponent,
  TaskHeaderComponent,
];

const ENTRY = [];

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
