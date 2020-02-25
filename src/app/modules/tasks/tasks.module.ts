import { NgModule } from '@angular/core';
import { ShareModule } from '@share/index';
import { TaskHomeComponent } from './task-home';
import { TaskItemComponent } from './task-item';
import { TaskListComponent } from './task-list';
import { TasksRoutingModule } from './tasks.routing';
import { TaskHeaderComponent } from './task-header';
import { TaskAddComponent } from './task-add';
import { TaskCopyComponent } from './task-copy';
import { TaskEditComponent } from './task-edit';
import { TaskQuickComponent } from './task-quick';

const COMMON = [
  TaskHomeComponent,
  TaskListComponent,
  TaskItemComponent,
  TaskHeaderComponent,
  TaskAddComponent,
  TaskCopyComponent,
  TaskEditComponent,
  TaskQuickComponent,
];

const ENTRY = [
  TaskAddComponent,
  TaskCopyComponent,
  TaskEditComponent,
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
