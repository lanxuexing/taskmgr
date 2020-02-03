import { NgModule } from '@angular/core';
import { ShareModule } from '../../share';
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


@NgModule({
  declarations: [
    ...COMMON
  ],
  imports: [
    ShareModule,
    ProjectRoutingModule
  ]
})
export class ProjectsModule { }
