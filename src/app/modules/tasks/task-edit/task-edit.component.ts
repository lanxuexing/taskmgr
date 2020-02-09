import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {title: string}
  ) {
    this.title = this.data.title;
  }

  ngOnInit() {
  }

}
