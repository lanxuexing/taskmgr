import { NgModule } from '@angular/core';
import { ShareModule } from './../../share';
import { TaskHomeComponent } from './task-home';
import { TaskItemComponent } from './task-item';
import { TaskListComponent } from './task-list';
import { TasksRoutingModule } from './tasks.routing';
import { TaskHeaderComponent } from './task-header';
import { TaskAddComponent } from './task-add';
import { TaskCopyComponent } from './task-copy';
import { TaskEditComponent } from './task-edit';
import { TaskQuickComponent } from './task-quick/task-quick.component';

const COMMON = [
  TaskHomeComponent,
  TaskListComponent,
  TaskItemComponent,
  TaskHeaderComponent,
  TaskAddComponent,
  TaskCopyComponent,
  TaskEditComponent,
];

const ENTRY = [
  TaskAddComponent,
  TaskCopyComponent,
  TaskEditComponent,
];

@NgModule({
  declarations: [
    ...COMMON,
    TaskQuickComponent
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
