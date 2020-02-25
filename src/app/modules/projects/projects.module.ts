import { NgModule } from '@angular/core';
import { ShareModule } from '@share/index';
import { ProjectAddComponent } from './project-add';
import { ProjectInviteComponent } from './project-invite';
import { ProjectItemComponent } from './project-item';
import { ProjectListComponent } from './project-list';
import { ProjectRoutingModule } from './project.routing';

const COMMON = [
  ProjectListComponent,
  ProjectItemComponent,
  ProjectInviteComponent,
  ProjectAddComponent,
];

const ENTRY = [
  ProjectInviteComponent,
  ProjectAddComponent,
];


@NgModule({
  declarations: [
    ...COMMON
  ],
  imports: [
    ShareModule,
    ProjectRoutingModule
  ],
  entryComponents: [
    ...ENTRY
  ]
})
export class ProjectsModule { }
