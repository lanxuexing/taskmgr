import { NgModule } from '@angular/core';
import { ShareModule } from './../../share/share.module';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksRoutingModule } from './tasks.routing';

const COMMON = [
  TaskHomeComponent,
  TaskListComponent,
  TaskItemComponent,
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
