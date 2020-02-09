import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../models';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  @Output() save = new EventEmitter<Project>();

  constructor() { }

  ngOnInit() { }

  // 保存
  onSave() {
    this.save.emit();
  }

}
