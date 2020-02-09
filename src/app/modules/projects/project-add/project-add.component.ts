import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../../../models';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  title: string;
  @Output() save = new EventEmitter<Project>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {title: string},
    private dialogRef: MatDialogRef<ProjectAddComponent>
  ) {
    this.title = this.data.title;
  }

  ngOnInit() { }

  // 保存
  onSave() {
    this.save.emit();
  }

}
